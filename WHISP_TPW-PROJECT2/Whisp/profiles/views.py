from django.shortcuts import render
from rest_framework.generics import RetrieveAPIView,ListAPIView,UpdateAPIView
from .models import Profile
from feed.models import Post
from .serializers import ProfileSerializer,UserPostSerializer
from rest_framework.permissions import IsAuthenticatedOrReadOnly,IsAuthenticated, AllowAny
from rest_framework.response import Response
from rest_framework import status
from rest_framework.decorators import api_view, permission_classes



@api_view(['GET', 'PUT']) 
@permission_classes([AllowAny])
def get_user_profile(request, id):
    try:
        profile = Profile.objects.get(id=id)
        if request.method == 'GET':
            serializer = ProfileSerializer(profile)
            return Response(serializer.data)
        elif request.method == 'PUT':
            serializer = ProfileSerializer(profile, data=request.data)
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data)
            else:
                return Response({'error': 'Falha na validação', 'details': serializer.errors}, status=status.HTTP_400_BAD_REQUEST)


    except Profile.DoesNotExist:
        return Response({'error': 'User not found'}, status=status.HTTP_404_NOT_FOUND)
    
    
class UserPostsView(ListAPIView):
    serializer_class = UserPostSerializer
    permission_classes = [AllowAny]

    def get_queryset(self):
        user_id = self.kwargs.get('user_id')
        return Post.objects.filter(author__id=user_id)
    