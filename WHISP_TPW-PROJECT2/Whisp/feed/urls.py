from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import PostListAPIView,PostCreateAPIView,CreateCommentAPIView,DeleteCommentAPIView,LikePostAPIView,DetailPostAPIView,DeletePostAPIView, UserPostsListAPIView



app_name='feed'

urlpatterns = [
    path('posts/', PostListAPIView.as_view(), name='post-list'),
    path('post/create/', PostCreateAPIView.as_view(), name='post-create'),
    path('posts/<str:username>/', UserPostsListAPIView.as_view(), name='user-posts-list'),
    path('post/<int:post_id>/comment/', CreateCommentAPIView.as_view(), name='create-comment'),
    path('comment/<int:pk>/delete/', DeleteCommentAPIView.as_view(), name='delete-comment'),
    path('post/<int:post_id>/like/', LikePostAPIView.as_view(), name='like-post'),
    path('post/<int:pk>/', DetailPostAPIView.as_view(), name='detail-post'),
    path('post/<int:pk>/delete/', DeletePostAPIView.as_view(), name='delete-post'),
]