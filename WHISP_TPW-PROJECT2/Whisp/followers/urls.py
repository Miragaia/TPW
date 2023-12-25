from django.urls import path
from .views import FollowUnfollowAPIView

app_name="followers"

urlpatterns = [
  path('user/<int:user_id>/follow-unfollow/', FollowUnfollowAPIView.as_view(), name='follow-unfollow'),
]