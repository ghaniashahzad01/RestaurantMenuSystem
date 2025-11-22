from django.urls import path
from .views import (
    # CATEGORY
    CategoryListCreateView, CategoryDetailView,
    
    # MENU
    MenuItemListCreateView, MenuItemDetailView,
    ToggleSpecialView,
    
    # ANALYTICS
    CategoryAnalyticsView,

    # ADMIN AUTH
    LoginView, LogoutView,
)

urlpatterns = [

    # --------------------
    # CATEGORY CRUD
    # --------------------
    path('categories/', CategoryListCreateView.as_view()),
    path('categories/<int:pk>/', CategoryDetailView.as_view()),

    # --------------------
    # MENU CRUD
    # --------------------
    path('menu/', MenuItemListCreateView.as_view()),
    path('menu/<int:pk>/', MenuItemDetailView.as_view()),

    # --------------------
    # SPECIAL MARK
    # --------------------
    path('menu/<int:pk>/toggle-special/', ToggleSpecialView.as_view()),

    # --------------------
    # ANALYTICS
    # --------------------
    path('analytics/', CategoryAnalyticsView.as_view()),

    # --------------------
    # ADMIN LOGIN/LOGOUT
    # --------------------
    path("admin/login/", LoginView.as_view(), name="admin-login"),
    path("admin/logout/", LogoutView.as_view(), name="admin-logout"),

]
