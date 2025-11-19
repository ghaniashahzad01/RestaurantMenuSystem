from django.urls import path
from .views import (
    CategoryListCreateView, CategoryDetailView,
    MenuItemListCreateView, MenuItemDetailView,
    ToggleSpecialView, CategoryAnalyticsView,
    LoginView, LogoutView
)

urlpatterns = [

    # --- CATEGORY CRUD ---
    path('categories/', CategoryListCreateView.as_view()),
    path('categories/<int:pk>/', CategoryDetailView.as_view()),

    # --- MENU ITEMS CRUD ---
    path('menu/', MenuItemListCreateView.as_view()),
    path('menu/<int:pk>/', MenuItemDetailView.as_view()),

    # --- SPECIALS ---
    path('menu/<int:pk>/toggle-special/', ToggleSpecialView.as_view()),

    # --- ANALYTICS ---
    path('analytics/', CategoryAnalyticsView.as_view()),

    # --- AUTH ---
    path('login/', LoginView.as_view()),
    path('logout/', LogoutView.as_view()),
]
