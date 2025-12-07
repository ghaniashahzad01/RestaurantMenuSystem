from rest_framework import serializers
from .models import Category, MenuItem, AdminNotification


# ---------- CATEGORY SERIALIZER ----------
class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = "__all__"


# ---------- MENU ITEM SERIALIZER (FIXED) ----------
class MenuItemSerializer(serializers.ModelSerializer):

    # read only name for display
    category_name = serializers.CharField(source="category.name", read_only=True)

    # write only FK id coming from frontend
    category = serializers.PrimaryKeyRelatedField(
        queryset=Category.objects.all(),
        write_only=True
    )

    class Meta:
        model = MenuItem
        fields = [
            "id",
            "name",
            "price",
            "image",
            "category",       
            "category_name",
            "is_special", 

        ]


# -------------------------
# ADMIN NOTIFICATION
# -------------------------
class AdminNotificationSerializer(serializers.ModelSerializer):
    class Meta:
        model = AdminNotification
        fields = "__all__"
