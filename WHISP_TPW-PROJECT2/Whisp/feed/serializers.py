from rest_framework import serializers
from .models import Post, Comment

class PostSerializer(serializers.ModelSerializer):
    likes_count = serializers.SerializerMethodField()
    comments_count = serializers.SerializerMethodField()
    author_username = serializers.SerializerMethodField()
    author_image=serializers.SerializerMethodField()
    
    class Meta:
        model = Post
        fields = ['id', 'text', 'image', 'video', 'author_username', 'date','likes_count', 'comments_count','author_image']

    def get_author_username(self, obj):
        return obj.author.username
        
    def get_likes_count(self, obj):
        return obj.likes.count()

    def get_comments_count(self, obj):
        return Comment.objects.filter(post=obj).count() 
    
    def get_author_image(self, obj):
        if obj.author.profile.image:
            return obj.author.profile.image.url
        return None

class CommentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Comment
        fields = ['id','author','post','body','date']
        
        

class PostSerializerHomepage(serializers.Serializer):
    userId = serializers.IntegerField()
    text = serializers.CharField()
    image = serializers.ImageField(required=False)
    video = serializers.FileField(required=False)
    
    
class PostDetailSerializer(serializers.ModelSerializer):
    comments = CommentSerializer(many=True, read_only=True)
    likes_count = serializers.SerializerMethodField()
    comments_count = serializers.SerializerMethodField()

    class Meta:
        model = Post
        fields = ['id', 'text', 'image', 'video', 'author', 'comments','likes_count', 'comments_count']
    
    def get_likes_count(self, obj):
        return obj.likes.count()

    def get_comments_count(self, obj):
        return obj.comments.count()
