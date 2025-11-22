# backend/accounts/serializers.py
from rest_framework import serializers
from django.contrib.auth import get_user_model

from .models import Cart, CartItem, Order, OrderItem
from foodordering.serializers import MenuItemSerializer

User = get_user_model()


# -------------------------
# USER REGISTER
# -------------------------
class RegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True, min_length=6)

    class Meta:
        model = User
        fields = ("email", "full_name", "password")

    def create(self, validated_data):
        password = validated_data.pop("password")
        user = User.objects.create_user(password=password, **validated_data)
        return user


# -------------------------
# USER DETAILS
# -------------------------
class UserSerializer(serializers.ModelSerializer):
    is_staff = serializers.BooleanField(read_only=True)

    class Meta:
        model = User
        fields = ("id", "email", "full_name", "is_staff")



# -------------------------
# CART ITEM SERIALIZER
# -------------------------
class CartItemSerializer(serializers.ModelSerializer):
    menu_item_detail = MenuItemSerializer(source="menu_item", read_only=True)

    class Meta:
        model = CartItem
        fields = ["id", "menu_item", "quantity", "menu_item_detail"]


# -------------------------
# ORDER ITEM SERIALIZER
# -------------------------
class OrderItemSerializer(serializers.ModelSerializer):
    menu_item_detail = MenuItemSerializer(source="menu_item", read_only=True)

    class Meta:
        model = OrderItem
        fields = ["id", "quantity", "unit_price", "menu_item_detail"]


# -------------------------
# ORDER SERIALIZER
# -------------------------
class OrderSerializer(serializers.ModelSerializer):
    items = OrderItemSerializer(many=True, read_only=True)

    class Meta:
        model = Order
        fields = [
            "id",
            "created_at",
            "total",
            "name",
            "email",
            "phone",
            "address",
            "items",
        ]
