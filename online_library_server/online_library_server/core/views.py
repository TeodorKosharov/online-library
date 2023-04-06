from django.contrib.auth import get_user_model
from rest_framework.authentication import TokenAuthentication
from rest_framework.authtoken.models import Token
from rest_framework.decorators import api_view, authentication_classes, permission_classes
from rest_framework.parsers import JSONParser
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from online_library_server.core.serializers import BookSerializer, CommentSerializer
from online_library_server.core.models import Book, Comment
from rest_framework import status

UserModel = get_user_model()


@api_view(['GET'])
@authentication_classes([])
@permission_classes([])
def get_books(request):
    serializer = BookSerializer(Book.objects.all(), many=True)
    return Response(serializer.data, status=status.HTTP_200_OK)


@api_view(['GET'])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
def get_user_books(request, user_id):
    books = Book.objects.filter(creator_id=user_id)
    serializer = BookSerializer(books, many=True)
    return Response(serializer.data, status=status.HTTP_200_OK)


@api_view(['POST'])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
def add_book(request):
    if request.method == 'POST':
        data = JSONParser().parse(request)
        serializer = BookSerializer(data=data)
        if serializer.is_valid():
            serializer.save()
            return Response('Book added successfully!', status=status.HTTP_201_CREATED)
        errors = serializer.errors.values()
        return Response(errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['PUT'])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
def edit_book(request, book_id):
    selected_book = Book.objects.get(pk=book_id)
    request_user_id = Token.objects.get(key=request.auth).user_id

    if request.method == 'PUT':
        data = JSONParser().parse(request)
        if data.get('creator_id') != request_user_id:
            return Response('You can edit only your own books!', status=status.HTTP_401_UNAUTHORIZED)

        serializer = BookSerializer(instance=selected_book, data=data)

        if serializer.is_valid():
            serializer.save()
            return Response('Book updated successfully!', status=status.HTTP_200_OK)
        errors = serializer.errors.values()
        return Response(errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['DELETE'])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
def delete_book(request, book_id):
    selected_book = Book.objects.get(pk=book_id)
    request_user_id = Token.objects.get(key=request.auth).user_id
    if selected_book.creator_id != request_user_id:
        return Response('You can delete only your own books!', status=status.HTTP_401_UNAUTHORIZED)
    Comment.objects.filter(book_id=selected_book.id).delete()
    selected_book.delete()
    return Response('Book deleted successfully!', status=status.HTTP_202_ACCEPTED)


@api_view(['GET'])
@authentication_classes([])
@permission_classes([])
def details_book(request, book_id):
    selected_book = Book.objects.get(pk=book_id)
    return Response(
        {
            'title': selected_book.title,
            'description': selected_book.description,
            'genre': selected_book.genre,
            'imageUrl': selected_book.image_url,
        }, status=status.HTTP_200_OK)


@api_view(['GET'])
@authentication_classes([])
@permission_classes([])
def get_comments(request, book_id):
    comments_queryset = Comment.objects.filter(book_id=book_id)
    comments = CommentSerializer(comments_queryset, many=True)
    return Response(comments.data, status=status.HTTP_200_OK)


@api_view(['POST'])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
def add_comment(request):
    if request.method == 'POST':
        data = JSONParser().parse(request)
        serializer = CommentSerializer(data=data)

        if serializer.is_valid():
            serializer.save()
            return Response('Comment created successfully!', status=status.HTTP_201_CREATED)
        errors = serializer.errors.values()
        return Response(errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['DELETE'])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
def delete_comment(request, comment_id):
    selected_comment = Comment.objects.get(pk=comment_id)
    request_user_id = Token.objects.get(key=request.auth).user_id
    request_user_username = UserModel.objects.get(id=request_user_id).username
    if selected_comment.commentator_username != request_user_username:
        return Response('You can delete only your own comments!', status=status.HTTP_401_UNAUTHORIZED)
    selected_comment.delete()
    return Response('Comment deleted successfully!', status=status.HTTP_202_ACCEPTED)
