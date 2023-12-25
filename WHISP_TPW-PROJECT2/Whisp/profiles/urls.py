from django.urls import path
from .views import UserPostsView, get_user_profile


app_name = "profiles"

urlpatterns = [
    path('user/<int:id>/', get_user_profile, name='user-profile'),
    path('user/<int:id>/posts/', UserPostsView.as_view(), name='user-posts'),
]