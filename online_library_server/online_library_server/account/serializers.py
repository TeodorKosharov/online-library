from django.contrib.auth import get_user_model
from rest_framework import serializers
from rest_framework.exceptions import ValidationError

UserModel = get_user_model()


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserModel
        fields = '__all__'

    def validate(self, data):
        password = data.get('password')

        if len(password) < 8:
            raise ValidationError('Password too short!')

        return super().validate(data)

