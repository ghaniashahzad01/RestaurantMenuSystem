from rest_framework import serializers
from django.contrib.auth import get_user_model
from .models import CartItem, Order, OrderItem
from foodordering.serializers import MenuItemSerializer  # optional: reuse if exists

User = get_user_model()

class RegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True, min_length=6)

    class Meta:
        model = User
        fields = ("email", "full_name", "password")

    def create(self, validated_data):
        password = validated_data.pop("password")
        user = User.objects.create_user(password=password, **validated_data)
        return user

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ("id", "email", "full_name")

class CartItemSerializer(serializers.ModelSerializer):
    menu_item = serializers.PrimaryKeyRelatedField(read_only=True)
    menu_item_detail = serializers.SerializerMethodField()

    class Meta:
        model = CartItem
        fields = ("id", "menu_item", "menu_item_detail", "quantity")

    def get_menu_item_detail(self, obj):
        # return basic menu info
        return {
            "id": obj.menu_item.id,
            "name": obj.menu_item.name,
            "price": str(obj.menu_item.price),
            "image": obj.menu_item.image.url if obj.menu_item.image else None,
            "category_name": obj.menu_item.category.name if getattr(obj.menu_item, "category", None) else ""
        }

class OrderItemSerializer(serializers.ModelSerializer):
    menu_item_detail = serializers.SerializerMethodField()
    class Meta:
        model = OrderItem
        fields = ("menu_item_detail", "quantity", "unit_price")

    def get_menu_item_detail(self, obj):
        return {"id": obj.menu_item.id, "name": obj.menu_item.name, "price": str(obj.unit_price)}

class OrderSerializer(serializers.ModelSerializer):
    items = OrderItemSerializer(many=True, read_only=True)
    class Meta:
        model = Order
        fields = ("id", "created_at", "total", "name", "email", "phone", "address", "items")
