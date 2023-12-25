from rest_framework.views import APIView
from rest_framework.response import Response
from .models import Post,Comment,Like
from rest_framework import status
from .serializers import PostSerializer,PostSerializerHomepage,CommentSerializer,PostDetailSerializer
from rest_framework.permissions import IsAuthenticated
from rest_framework.generics import DestroyAPIView
from rest_framework.permissions import IsAuthenticatedOrReadOnly
from rest_framework.exceptions import PermissionDenied
from rest_framework.generics import RetrieveAPIView
from django.contrib.auth.models import User
from rest_framework.permissions import AllowAny



class PostListAPIView(APIView):
    def get(self, request, format=None):
        posts = Post.objects.all().order_by('-id')[:60]
        serializer = PostSerializer(posts, many=True)
        return Response(serializer.data)


class UserPostsListAPIView(APIView):
    def get(self, request, username, format=None):
        posts = Post.objects.filter(author__username=username).order_by('-id')[:60]
        serializer = PostSerializer(posts, many=True)
        return Response(serializer.data)    


class PostCreateAPIView(APIView):
    def post(self, request, format=None):
        print(request.data)
        serializer = PostSerializerHomepage(data=request.data)
        
        

        if serializer.is_valid():
            post_data = serializer.validated_data

            # Obter userId do request
            user_id = post_data.get('userId')
            print(user_id)  

            try:
                user = User.objects.get(id=user_id)
            except User.DoesNotExist:
                return Response({"error": "Usuário não encontrado."}, status=status.HTTP_404_NOT_FOUND)

            post = Post(
                text=post_data.get('text'),
                image=post_data.get('image'),
                video=post_data.get('video'),
                author=user  # Usar o usuário obtido
            )
            post.save()

            return Response(serializer.data, status=status.HTTP_201_CREATED)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    
    
class DeletePostAPIView(DestroyAPIView):
    queryset = Post.objects.all()
    permission_classes = [AllowAny]

    def perform_destroy(self, instance):
        user = self.request.user
        instance.delete()


class CreateCommentAPIView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request, post_id, format=None):
        serializer = CommentSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save(author=request.user, post_id=post_id)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)




class DeleteCommentAPIView(DestroyAPIView):
    queryset = Comment.objects.all()
    permission_classes = [IsAuthenticatedOrReadOnly]

    def perform_destroy(self, instance):
        user = self.request.user
        if user == instance.author or user.is_staff:
            instance.delete()
        else:
            raise PermissionDenied("Você não tem permissão para excluir este comentário.")




class LikePostAPIView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request, post_id, format=None):
        post = Post.objects.get(id=post_id)
        if request.user in post.likes.all():
            post.likes.remove(request.user)
        else:
            post.likes.add(request.user)
        return Response({"status": "like status changed"}, status=status.HTTP_200_OK)


class DetailPostAPIView(RetrieveAPIView):
    queryset = Post.objects.all()
    serializer_class = PostDetailSerializer