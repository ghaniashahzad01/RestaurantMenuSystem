from rest_framework import generics, status
from rest_framework.response import Response
from django.contrib.auth import authenticate, login, logout
from rest_framework.views import APIView

from .models import Category, MenuItem
from .serializers import CategorySerializer, MenuItemSerializer


# ---------- CATEGORY CRUD ----------
class CategoryListCreateView(generics.ListCreateAPIView):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer


class CategoryDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer


# ---------- MENU ITEM CRUD ----------
class MenuItemListCreateView(generics.ListCreateAPIView):
    queryset = MenuItem.objects.all()
    serializer_class = MenuItemSerializer


class MenuItemDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = MenuItem.objects.all()
    serializer_class = MenuItemSerializer


# ---------- TOGGLE SPECIAL ----------
class ToggleSpecialView(APIView):
    def post(self, request, pk):
        item = MenuItem.objects.get(id=pk)
        item.is_special = not item.is_special
        item.save()
        return Response({"message": "Special status updated"})


# ---------- ANALYTICS ----------
class CategoryAnalyticsView(APIView):
    def get(self, request):
        data = []
        categories = Category.objects.all()
        for cat in categories:
            count = MenuItem.objects.filter(category=cat).count()
            data.append({"category": cat.name, "count": count})
        return Response(data)


from rest_framework.parsers import JSONParser
from rest_framework.permissions import AllowAny

class LoginView(APIView):
    permission_classes = [AllowAny]
    parser_classes = [JSONParser]

    def post(self, request):
        username = request.data.get("username")
        password = request.data.get("password")

        user = authenticate(username=username, password=password)

        if user is not None:
            login(request, user)
            return Response({
                "message": "Login success",
                "username": user.username
            })
        else:
            return Response({"message": "Invalid credentials"}, status=400)



# ---------- LOGOUT ----------
class LogoutView(APIView):
    def post(self, request):
        logout(request)
        return Response({"message": "Logged out"})
