from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status, permissions
from django.contrib.auth import authenticate, login, logout
from django.contrib.auth import get_user_model
from django.shortcuts import get_object_or_404

from rest_framework.authtoken.models import Token

# Serializers
from .serializers import (
    RegisterSerializer, UserSerializer,
    CartItemSerializer, OrderSerializer
)

# Models
from .models import Cart, CartItem, Order, OrderItem
from foodordering.models import MenuItem

User = get_user_model()


# REGISTER
class RegisterView(APIView):
    permission_classes = [permissions.AllowAny]

    def post(self, request):
        ser = RegisterSerializer(data=request.data)
        if ser.is_valid():
            user = ser.save()
            return Response(UserSerializer(user).data, status=201)
        return Response(ser.errors, status=400)


# LOGIN
class LoginView(APIView):
    permission_classes = [permissions.AllowAny]

    def post(self, request):
        email = request.data.get("email")
        password = request.data.get("password")

        user = authenticate(request, username=email, password=password)

        if not user:
            return Response({"detail": "Invalid credentials"}, status=400)

        token, _ = Token.objects.get_or_create(user=user)

        return Response({
            "token": token.key,
            "id": user.id,
            "email": user.email,
            "full_name": user.full_name,
            "is_staff": user.is_staff
        })


# LOGOUT
class LogoutView(APIView):
    def post(self, request):
        logout(request)
        return Response({"detail": "Logged out"})


# CURRENT USER
class MeView(APIView):
    def get(self, request):
        if not request.user.is_authenticated:
            return Response({"user": None})
        return Response(UserSerializer(request.user).data)


# GET CART ITEMS
class CartView(APIView):
    def get(self, request):
        if not request.user.is_authenticated:
            return Response([], status=200)
        items = CartItem.objects.filter(cart__user=request.user).select_related("menu_item")
        ser = CartItemSerializer(items, many=True)
        return Response(ser.data)


# ADD TO CART
class CartAddView(APIView):
    def post(self, request):
        if not request.user.is_authenticated:
            return Response({"detail": "Login required"}, status=401)

        item_id = request.data.get("item_id")
        qty = int(request.data.get("quantity", 1))

        menu_item = get_object_or_404(MenuItem, pk=item_id)

        cart, _ = Cart.objects.get_or_create(user=request.user)

        cart_item, created = CartItem.objects.get_or_create(
            cart=cart,
            menu_item=menu_item,
            defaults={"quantity": qty}
        )

        if not created:
            cart_item.quantity = cart_item.quantity + qty
            cart_item.save()

        return Response({"detail": "added"}, status=200)


# REMOVE FROM CART
class CartRemoveView(APIView):
    def post(self, request):
        if not request.user.is_authenticated:
            return Response({"detail": "Login required"}, status=401)

        item_id = request.data.get("item_id")
        CartItem.objects.filter(cart__user=request.user, menu_item__id=item_id).delete()

        return Response({"detail": "removed"})


# ⭐ NEW — UPDATE QUANTITY
class CartUpdateView(APIView):
    def post(self, request):
        if not request.user.is_authenticated:
            return Response({"detail": "Login required"}, status=401)

        item_id = request.data.get("item_id")
        quantity = int(request.data.get("quantity", 1))

        if quantity < 1:
            return Response({"detail": "Invalid quantity"}, status=400)

        cart_item = get_object_or_404(
            CartItem,
            cart__user=request.user,
            menu_item__id=item_id
        )

        cart_item.quantity = quantity
        cart_item.save()

        return Response({"detail": "updated"}, status=200)


# CREATE ORDER
class OrderCreateView(APIView):
    def post(self, request):
        if not request.user.is_authenticated:
            return Response({"detail": "Login required"}, status=401)

        user = request.user
        name = request.data.get("name", user.full_name or "")
        email = request.data.get("email", user.email)
        phone = request.data.get("phone", "")
        address = request.data.get("address", "")
        payment_method = request.data.get("payment_method", "COD")


        cart_items = CartItem.objects.filter(cart__user=user)
        if not cart_items.exists():
            return Response({"detail": "Cart empty"}, status=400)

        # Create order manually (your model style)
        order = Order.objects.create(
            user=user,
            name=name,
            email=email,
            phone=phone,
            address=address
        )

        total = 0
        for ci in cart_items:
            unit_price = ci.menu_item.price
            OrderItem.objects.create(
                order=order,
                menu_item=ci.menu_item,
                quantity=ci.quantity,
                unit_price=unit_price
            )
            total += unit_price * ci.quantity

        order.total = total
        order.save()

        cart_items.delete()

        return Response(OrderSerializer(order).data, status=201)



# USER ORDER LIST
class OrderListView(APIView):
    def get(self, request):
        if not request.user.is_authenticated:
            return Response([], status=200)

        orders = Order.objects.filter(user=request.user).order_by("-created_at")
        return Response(OrderSerializer(orders, many=True).data)



class OrderDetailView(APIView):
    def get(self, request, id):
        if not request.user.is_authenticated:
            return Response({"detail": "Login required"}, status=401)

        order = get_object_or_404(Order, id=id, user=request.user)
        ser = OrderSerializer(order)
        return Response(ser.data)