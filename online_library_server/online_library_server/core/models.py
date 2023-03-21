from django.contrib.auth import get_user_model
from django.db import models

UserModel = get_user_model()


class Book(models.Model):
    title = models.CharField(max_length=15, null=False, blank=False)
    description = models.CharField(max_length=100, null=False, blank=False)
    genre = models.CharField(max_length=15, choices=(
        ('fiction', 'fiction'),
        ('mystery', 'mystery'),
        ('adventure', 'adventure'),
        ('biography', 'biography')
    ), null=False, blank=False)
    image_url = models.URLField(null=False, blank=False)
    creator_id = models.PositiveIntegerField(null=False, blank=False)


class Comment(models.Model):
    commentator_id = models.PositiveIntegerField(null=False, blank=False)
    book_id = models.PositiveIntegerField(null=False, blank=False)
    comment_description = models.CharField(max_length=50, null=False, blank=False)
