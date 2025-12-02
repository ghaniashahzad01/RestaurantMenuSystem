from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status, permissions
from django.contrib.auth import authenticate, logout
from django.contrib.auth import get_user_model
from django.shortcuts import get_object_or_404
from rest_framework.authtoken.models import Token
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated

from .models import Cart, CartItem, OrderItem
from accounts.models import Order
from foodordering.models import AdminNotification

from .serializers import (
    RegisterSerializer, UserSerializer,
    CartItemSerializer, OrderSerializer
)
from foodordering.models import MenuItem

import stripe
from django.conf import settings
from django.http import JsonResponse

# ✅ IMPORTANT
stripe.api_key = getattr(settings, "STRIPE_SECRET_KEY", None)

User = get_user_model()


class RegisterView(APIView):
    permission_classes = [permissions.AllowAny]
    def post(self, request):
        ser = RegisterSerializer(data=request.data)
        if ser.is_valid():
            user = ser.save()
            return Response(UserSerializer(user).data, status=201)
        return Response(ser.errors, status=400)


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


class LogoutView(APIView):
    def post(self, request):
        logout(request)
        return Response({"detail": "Logged out"})


class MeView(APIView):
    def get(self, request):
        if not request.user.is_authenticated:
            return Response({"user": None})
        return Response(UserSerializer(request.user).data)


class CartView(APIView):
    def get(self, request):
        if not request.user.is_authenticated:
            return Response([], status=200)

        items = CartItem.objects.filter(cart__user=request.user).select_related("menu_item")
        return Response(CartItemSerializer(items, many=True).data)


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
            cart_item.quantity += qty
            cart_item.save()

        return Response({"detail": "added"})


class CartRemoveView(APIView):
    def post(self, request):
        CartItem.objects.filter(cart__user=request.user, menu_item__id=request.data.get("item_id")).delete()
        return Response({"detail": "removed"})


class CartUpdateView(APIView):
    def post(self, request):
        item_id = request.data.get("item_id")
        quantity = int(request.data.get("quantity", 1))
        cart_item = get_object_or_404(CartItem, cart__user=request.user, menu_item__id=item_id)
        cart_item.quantity = quantity
        cart_item.save()
        return Response({"detail": "updated"})


class OrderCreateView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        user = request.user
        data = request.data

        cart_items = CartItem.objects.filter(cart__user=user)
        if not cart_items.exists():
            return Response({"detail": "Cart empty"}, status=400)

        payment_method = data.get("payment_method").lower()

        
        total = sum(ci.menu_item.price * ci.quantity for ci in cart_items)

       
        order = Order.objects.create(
            user=user,
            name=data.get("name"),
            email=data.get("email"),
            phone=data.get("phone"),
            address=data.get("address"),
            total=total,
            payment_method=payment_method,
            is_paid=True if payment_method == "cod" else False
        )

       
        for ci in cart_items:
            OrderItem.objects.create(
                order=order,
                menu_item=ci.menu_item,
                quantity=ci.quantity,
                unit_price=ci.menu_item.price
            )

        AdminNotification.objects.create(
            message=f"ORDER #{order.id} • {user.email} • {payment_method.upper()}"
        )

        
        if payment_method == "cod":
            cart_items.delete()
            return Response(OrderSerializer(order).data)

       
        return Response({
            "order_id": order.id,
            "message": "Proceed to Stripe payment"
        })



class OrderListView(APIView):
    def get(self, request):
        orders = Order.objects.filter(user=request.user).order_by("-created_at")
        return Response(OrderSerializer(orders, many=True).data)


class OrderDetailView(APIView):
    def get(self, request, id):
        order = get_object_or_404(Order, id=id, user=request.user)
        return Response(OrderSerializer(order).data)



@api_view(["GET"])
@permission_classes([IsAuthenticated])
def create_checkout_session(request):

    cart_items = CartItem.objects.filter(cart__user=request.user)
    if not cart_items.exists():
        return JsonResponse({"error": "Cart empty"}, status=400)

    total = sum(float(ci.menu_item.price) * ci.quantity for ci in cart_items)
    amount = int(total * 100)

    try:
        session = stripe.checkout.Session.create(
            payment_method_types=["card"],
            mode="payment",
            line_items=[{
                "price_data": {
                    "currency": "pkr",
                    "product_data": {"name": "Restaurant Order"},
                    "unit_amount": amount,
                },
                "quantity": 1,
            }],
            success_url="http://localhost:5173/stripe-success",
            cancel_url="http://localhost:5173/payment-failed",
        )

        return JsonResponse({"url": session.url})

    except Exception as e:
        return JsonResponse({"error": str(e)}, status=500)
