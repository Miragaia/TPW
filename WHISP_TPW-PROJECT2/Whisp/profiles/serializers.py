from rest_framework import serializers

from feed.models import Post
from .models import Profile
from followers.models import Follower


class ProfileSerializer(serializers.ModelSerializer):
    followers_count = serializers.SerializerMethodField()
    class Meta:
        model = Profile
        fields = ['image', 'bg_image', 'biography','followers_count']
        
    def get_followers_count(self, obj):
        return Follower.objects.filter(following=obj.user).count()
        
        
class UserPostSerializer(serializers.ModelSerializer):
    class Meta:
        model = Post
        fields = ['id', 'text', 'image', 'video', 'likes', 'date']