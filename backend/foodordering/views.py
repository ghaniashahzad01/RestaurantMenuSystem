from rest_framework import generics, status
from rest_framework.response import Response
from django.contrib.auth import authenticate, login, logout
from rest_framework.views import APIView
from rest_framework.permissions import AllowAny, IsAdminUser
from rest_framework.authtoken.models import Token
from rest_framework import permissions

from accounts.models import Order
from foodordering.models import AdminNotification
from accounts.serializers import OrderSerializer

# Admin-side models
from .models import Category, MenuItem
from .serializers import CategorySerializer, MenuItemSerializer

# ---------------------------------------
# CATEGORY CRUD
# ---------------------------------------
class CategoryListCreateView(generics.ListCreateAPIView):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer


class CategoryDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer


# ---------------------------------------
# MENU ITEM CRUD
# ---------------------------------------
class MenuItemListCreateView(generics.ListCreateAPIView):
    queryset = MenuItem.objects.all()
    serializer_class = MenuItemSerializer


class MenuItemDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = MenuItem.objects.all()
    serializer_class = MenuItemSerializer


# ---------------------------------------
# TOGGLE SPECIAL
# ---------------------------------------
class ToggleSpecialView(APIView):
    def post(self, request, pk):
        item = MenuItem.objects.get(id=pk)
        item.is_special = not item.is_special
        item.save()
        return Response({"message": "Special status updated"})


# ---------------------------------------
# CATEGORY ANALYTICS
# ---------------------------------------
class CategoryAnalyticsView(APIView):
    def get(self, request):
        data = []
        categories = Category.objects.all()

        for cat in categories:
            count = MenuItem.objects.filter(category=cat).count()
            data.append({"category": cat.name, "count": count})

        return Response(data)


# ---------------------------------------
# ADMIN NOTIFICATION 
# ---------------------------------------
class AdminNotificationList(APIView):
    permission_classes = [IsAdminUser]

    def get(self, request):
        notes = AdminNotification.objects.order_by("-created_at")
        return Response([
            {
                "id": n.id,
                "message": n.message,
                "created_at": n.created_at,
                "is_read": n.is_read,
            } for n in notes
        ])


# ---------------------------------------
# ADMIN ORDER LIST 
# ---------------------------------------
class AdminOrderListView(APIView):
    permission_classes = [IsAdminUser]

    def get(self, request):
        orders = Order.objects.all().order_by("-created_at")
        ser = OrderSerializer(orders, many=True)
        return Response(ser.data)


# ---------------------------------------
# ADMIN LOGIN 
# ---------------------------------------
class LoginView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        email = request.data.get("email")
        password = request.data.get("password")

        user = authenticate(username=email, password=password)

        if user and user.is_staff:
            token, _ = Token.objects.get_or_create(user=user)
            login(request, user)

            return Response({
                "token": token.key,
                "id": user.id,
                "email": user.email,
                "full_name": user.full_name,
                "is_staff": user.is_staff
            })

        return Response({"message": "Invalid admin credentials"}, status=400)


# ---------------------------------------
# ADMIN LOGOUT
# ---------------------------------------
class LogoutView(APIView):
    def post(self, request):
        logout(request)
        return Response({"message": "Logged out"})
