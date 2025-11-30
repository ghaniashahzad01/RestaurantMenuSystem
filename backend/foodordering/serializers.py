from rest_framework import serializers
from .models import Category, MenuItem, AdminNotification


# ---------- CATEGORY SERIALIZER ----------
class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = "__all__"


# ---------- MENU ITEM SERIALIZER ----------
class MenuItemSerializer(serializers.ModelSerializer):
    category_name = serializers.CharField(source="category.name", read_only=True)

    class Meta:
        model = MenuItem
        fields = [
            "id",
            "name",         
            "price",
            "image",
            "category_name"
        ]


# -------------------------
# ADMIN NOTIFICATION
# -------------------------
class AdminNotificationSerializer(serializers.ModelSerializer):
    class Meta:
        model = AdminNotification
        fields = "__all__"
