from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.contrib.auth.models import User
from .models import Follower
from rest_framework.permissions import IsAuthenticated

class FollowUnfollowAPIView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request, id, format=None):
        try:
            other_user = User.objects.get(id=id)
        except User.DoesNotExist:
            return Response({'error': 'User not found'}, status=status.HTTP_404_NOT_FOUND)

        action = request.data.get('action')
        if action == 'follow':
            Follower.objects.get_or_create(followed_by=request.user, following=other_user)
            return Response({'status': 'following'}, status=status.HTTP_200_OK)

        elif action == 'unfollow':
            try:
                follower = Follower.objects.get(followed_by=request.user, following=other_user)
                follower.delete()
                return Response({'status': 'unfollowed'}, status=status.HTTP_200_OK)
            except Follower.DoesNotExist:
                return Response({'error': 'Not following'}, status=status.HTTP_404_NOT_FOUND)

        return Response({'error': 'Invalid action'}, status=status.HTTP_400_BAD_REQUEST)
