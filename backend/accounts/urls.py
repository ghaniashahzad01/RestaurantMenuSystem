from django.urls import path
from .views import RegisterView, LoginView, LogoutView, MeView, CartView, CartAddView, CartRemoveView, OrderCreateView, OrderListView

urlpatterns = [
    path("register/", RegisterView.as_view(), name="user-register"),
    path("login/", LoginView.as_view(), name="user-login"),
    path("logout/", LogoutView.as_view(), name="user-logout"),
    path("me/", MeView.as_view(), name="user-me"),

    path("cart/", CartView.as_view(), name="cart-view"),
    path("cart/add/", CartAddView.as_view(), name="cart-add"),
    path("cart/remove/", CartRemoveView.as_view(), name="cart-remove"),

    path("orders/", OrderCreateView.as_view(), name="order-create"),
    path("orders/list/", OrderListView.as_view(), name="order-list"),
]
