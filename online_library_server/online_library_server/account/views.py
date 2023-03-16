from django.contrib.auth import get_user_model, login, logout
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from rest_framework.parsers import JSONParser
from online_library_server.account.serializers import UserSerializer

UserModel = get_user_model()


@csrf_exempt
def register_user(request):
    if request.method == 'POST':
        data = JSONParser().parse(request)
        serializer = UserSerializer(data=data)

        if serializer.is_valid():
            serializer.save()
            return JsonResponse('User registered successfully!', status=201, safe=False)
        return JsonResponse(serializer.errors, status=400, safe=False)


@csrf_exempt
def login_user(request):
    if request.method == 'POST':
        data = JSONParser().parse(request)
        username = data.get('username')
        password = data.get('password')
        try:
            user = UserModel.objects.get(username=username, password=password)
            login(request, user)
            return JsonResponse('User logged-in successfully!', safe=False)
        except UserModel.DoesNotExist:
            return JsonResponse('User not found!', safe=False)


@csrf_exempt
def logout_user(request):
    logout(request)
    return JsonResponse('User logged-out successfully!', safe=False)


@csrf_exempt
def get_user_data(request):
    return JsonResponse(f'{request.user.username}', safe=False)
