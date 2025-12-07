from django.urls import path
from .views import (
    RegisterView, LoginView, LogoutView, MeView,
    CartView, CartAddView, CartRemoveView, CartUpdateView,
    OrderCreateView, OrderListView, OrderDetailView,
    create_checkout_session
)
from .views import StripeOrderConfirmView


urlpatterns = [
    path("register/", RegisterView.as_view()),
    path("login/", LoginView.as_view()),
    path("logout/", LogoutView.as_view()),
    path("me/", MeView.as_view()),

    path("cart/", CartView.as_view()),
    path("cart/add/", CartAddView.as_view()),
    path("cart/remove/", CartRemoveView.as_view()),
    path("cart/update/", CartUpdateView.as_view()),

    path("orders/", OrderCreateView.as_view()),
    path("orders/list/", OrderListView.as_view()),
    path("orders/<int:id>/", OrderDetailView.as_view()),

    path("create-checkout-session/", create_checkout_session),
    path("stripe-confirm/", StripeOrderConfirmView.as_view()),

]
