from django.db import models
from django.contrib.auth.models import User

class Follower(models.Model):
    followed_by = models.ForeignKey(User, related_name="following", on_delete=models.CASCADE)
    following = models.ForeignKey(User, related_name="followers", on_delete=models.CASCADE)

    class Meta:
        unique_together = ('followed_by', 'following')

    def __str__(self):
        return f"{self.followed_by} follows {self.following}"