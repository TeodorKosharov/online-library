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
        username = data.get('username')

        if len(password) < 8:
            raise ValidationError('Password is too short!')
        if len(username) <= 3:
            raise ValidationError('Username too short!')
        if len(username) > 10:
            raise ValidationError('The username can consist of a maximum of 10 characters!')

        return super().validate(data)

