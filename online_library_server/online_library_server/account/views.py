from django.contrib.auth import get_user_model, authenticate
from rest_framework.decorators import api_view, permission_classes, authentication_classes
from rest_framework.parsers import JSONParser
from rest_framework.response import Response
from online_library_server.account.serializers import UserSerializer
from rest_framework.authtoken.models import Token

UserModel = get_user_model()


@api_view(['POST'])
@authentication_classes([])
@permission_classes([])
def register_user(request):
    if request.method == 'POST':
        data = JSONParser().parse(request)
        serializer = UserSerializer(data=data)

        if serializer.is_valid():
            UserModel.objects.create_user(username=data.get('username'), password=data.get('password'))
            Token.objects.create(user=UserModel.objects.last())
            return Response('User registered successfully!', status=201)
        errors = serializer.errors.values()
        return Response(errors, status=400)


@api_view(['POST'])
@authentication_classes([])
@permission_classes([])
def login_user(request):
    if request.method == 'POST':
        data = JSONParser().parse(request)
        username = data.get('username')
        password = data.get('password')
        user = authenticate(username=username, password=password)
        if user is not None:
            token = Token.objects.get(user_id=user.id)
            return Response(token.key, status=200)
        if UserModel.objects.filter(username=username):
            return Response('Incorrect password!', status=403)
        return Response('User not found!', status=404)
