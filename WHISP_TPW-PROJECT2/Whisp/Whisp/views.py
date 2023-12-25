from django.contrib.auth.models import User
from django.http import JsonResponse
from rest_framework import status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from .serializers import ChangePasswordSerializer
from .serializers import UserSerializer
from rest_framework.generics import ListAPIView


@api_view(['POST'])
@permission_classes([AllowAny])
def change_password(request):
    serializer = ChangePasswordSerializer(data=request.data)
    if serializer.is_valid():
        username = serializer.validated_data.get('username')
        email = serializer.validated_data.get('email')
        new_password = serializer.validated_data.get('new_password')

        try:
            user = User.objects.get(username=username, email=email)
            user.set_password(new_password)
            user.save()
            return Response({"success": "Password changed successfully"}, status=status.HTTP_200_OK)
        except User.DoesNotExist:
            return Response({"error": "User not found or username and email do not match"}, status=status.HTTP_404_NOT_FOUND)
        except Exception as e:
            # Log the exception for debugging purposes
            print(f"Exception: {str(e)}")
            return Response({"error": "An error occurred while processing the request"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)



class UserListView(ListAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer



@api_view(['GET', 'PUT']) 
@permission_classes([AllowAny])
def get_user_info(request, username):
    try:
        user = User.objects.get(username=username)
        if request.method == 'GET':
            serializer = UserSerializer(user)
            return Response(serializer.data)
        elif request.method == 'PUT':
            serializer = UserSerializer(user, data=request.data)
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    except User.DoesNotExist:
        return Response({'error': 'User not found'}, status=status.HTTP_404_NOT_FOUND)