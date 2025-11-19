from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status, permissions
from django.contrib.auth import authenticate, login, logout
from django.contrib.auth import get_user_model
from .serializers import RegisterSerializer, UserSerializer, CartItemSerializer, OrderSerializer
from .models import CartItem, Order, OrderItem
from django.shortcuts import get_object_or_404
from foodordering.models import MenuItem  # adjust import path

User = get_user_model()

class RegisterView(APIView):
    permission_classes = [permissions.AllowAny]

    def post(self, request):
        ser = RegisterSerializer(data=request.data)
        if ser.is_valid():
            user = ser.save()
            return Response(UserSerializer(user).data, status=status.HTTP_201_CREATED)
        return Response(ser.errors, status=status.HTTP_400_BAD_REQUEST)

class LoginView(APIView):
    permission_classes = [permissions.AllowAny]

    def post(self, request):
        email = request.data.get("email")
        password = request.data.get("password")
        user = authenticate(request, username=email, password=password)
        if user:
            login(request, user)
            return Response(UserSerializer(user).data)
        return Response({"detail":"Invalid credentials"}, status=status.HTTP_400_BAD_REQUEST)

class LogoutView(APIView):
    def post(self, request):
        logout(request)
        return Response({"detail":"Logged out"})

class MeView(APIView):
    def get(self, request):
        if not request.user.is_authenticated:
            return Response({"user": None})
        return Response(UserSerializer(request.user).data)

# CART APIs
class CartView(APIView):
    def get(self, request):
        if not request.user.is_authenticated:
            return Response([], status=status.HTTP_200_OK)
        items = CartItem.objects.filter(user=request.user)
        ser = CartItemSerializer(items, many=True)
        return Response(ser.data)

class CartAddView(APIView):
    def post(self, request):
        if not request.user.is_authenticated:
            return Response({"detail":"Login required"}, status=status.HTTP_401_UNAUTHORIZED)
        item_id = request.data.get("item_id")
        qty = int(request.data.get("quantity", 1))
        menu_item = get_object_or_404(MenuItem, pk=item_id)
        obj, created = CartItem.objects.get_or_create(user=request.user, menu_item=menu_item)
        obj.quantity = qty if created else obj.quantity + qty
        obj.save()
        return Response({"detail":"added"}, status=status.HTTP_200_OK)

class CartRemoveView(APIView):
    def post(self, request):
        if not request.user.is_authenticated:
            return Response({"detail":"Login required"}, status=status.HTTP_401_UNAUTHORIZED)
        item_id = request.data.get("item_id")
        CartItem.objects.filter(user=request.user, menu_item__id=item_id).delete()
        return Response({"detail":"removed"})

# ORDERS
class OrderCreateView(APIView):
    def post(self, request):
        if not request.user.is_authenticated:
            return Response({"detail":"Login required"}, status=status.HTTP_401_UNAUTHORIZED)
        # build order from cart
        user = request.user
        name = request.data.get("name", user.full_name or "")
        email = request.data.get("email", user.email)
        phone = request.data.get("phone", "")
        address = request.data.get("address", "")
        cart_items = CartItem.objects.filter(user=user)
        if not cart_items.exists():
            return Response({"detail":"Cart empty"}, status=status.HTTP_400_BAD_REQUEST)

        order = Order.objects.create(user=user, name=name, email=email, phone=phone, address=address)
        total = 0
        for ci in cart_items:
            unit_price = ci.menu_item.price
            OrderItem.objects.create(order=order, menu_item=ci.menu_item, quantity=ci.quantity, unit_price=unit_price)
            total += unit_price * ci.quantity
        order.total = total
        order.save()
        cart_items.delete()
        return Response(OrderSerializer(order).data, status=status.HTTP_201_CREATED)

class OrderListView(APIView):
    def get(self, request):
        if not request.user.is_authenticated:
            return Response([], status=status.HTTP_200_OK)
        orders = Order.objects.filter(user=request.user).order_by("-created_at")
        ser = OrderSerializer(orders, many=True)
        return Response(ser.data)
