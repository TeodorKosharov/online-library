from rest_framework import serializers
from online_library_server.core.models import Book, Comment
from rest_framework.exceptions import ValidationError


class BookSerializer(serializers.ModelSerializer):
    class Meta:
        model = Book
        fields = '__all__'

    def validate(self, data):
        title = data.get('title')
        description = data.get('description')

        if len(title) < 3:
            raise ValidationError('The title is too short!')
        if len(description) < 10:
            raise ValidationError('The description is too short!')
        return super().validate(data)


class CommentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Comment
        fields = '__all__'
