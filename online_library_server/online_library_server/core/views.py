from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from rest_framework.parsers import JSONParser
from online_library_server.core.serializers import BookSerializer, CommentSerializer
from online_library_server.core.models import Book, Comment


@csrf_exempt
def get_books(request):
    if request.user.__class__.__name__ == 'AnonymousUser':
        return JsonResponse('You must be logged-in!', safe=False, status=401)

    serializer = BookSerializer(Book.objects.all(), many=True)
    return JsonResponse(serializer.data, safe=False, status=200)


@csrf_exempt
def add_book(request):
    if request.user.__class__.__name__ == 'AnonymousUser':
        return JsonResponse('You must be logged-in!', safe=False, status=401)

    if request.method == 'POST':
        data = JSONParser().parse(request)
        serializer = BookSerializer(data=data)

        if serializer.is_valid():
            serializer.save()
            return JsonResponse('Book created successfully!', safe=False, status=201)
        return JsonResponse(serializer.errors, safe=False, status=400)


@csrf_exempt
def edit_book(request, book_id):
    if request.user.__class__.__name__ == 'AnonymousUser':
        return JsonResponse('You must be logged-in!', safe=False, status=401)

    selected_book = Book.objects.get(pk=book_id)

    if request.user.id != selected_book.creator_id:
        return JsonResponse('You can edit only your own books!', safe=False, status=403)

    if request.method == 'PUT':
        data = JSONParser().parse(request)
        serializer = BookSerializer(instance=selected_book, data=data)

        if serializer.is_valid():
            serializer.save()
            return JsonResponse('Book updated successfully!', safe=False, status=200)
        return JsonResponse(serializer.errors, safe=False, status=400)


@csrf_exempt
def delete_book(request, book_id):
    if request.user.__class__.__name__ == 'AnonymousUser':
        return JsonResponse('You must be logged-in!', safe=False, status=401)

    selected_book = Book.objects.get(pk=book_id)

    if request.user.id != selected_book.creator_id:
        return JsonResponse('You can delete only your own books!', safe=False, status=403)

    Comment.objects.filter(book_id=selected_book.id).delete()
    selected_book.delete()
    return JsonResponse('Book deleted successfully!', safe=False, status=202)


@csrf_exempt
def add_comment(request):
    if request.user.__class__.__name__ == 'AnonymousUser':
        return JsonResponse('You must be logged-in!', safe=False, status=401)

    if request.method == 'POST':
        data = JSONParser().parse(request)
        serializer = CommentSerializer(data=data)

        if serializer.is_valid():
            serializer.save()
            return JsonResponse('Comment created successfully!', safe=False, status=201)
        return JsonResponse(serializer.errors, safe=False, status=400)


@csrf_exempt
def edit_comment(request, comment_id):
    if request.user.__class__.__name__ == 'AnonymousUser':
        return JsonResponse('You must be logged-in!', safe=False, status=401)

    selected_comment = Comment.objects.get(pk=comment_id)

    if request.user.id != selected_comment.commentator_id:
        return JsonResponse('You can edit only your own comments!', safe=False, status=403)

    if request.method == 'PUT':
        data = JSONParser().parse(request)
        serializer = CommentSerializer(instance=selected_comment, data=data)

        if serializer.is_valid():
            serializer.save()
            return JsonResponse('Comment updated successfully!', safe=False, status=200)
        return JsonResponse(serializer.errors, safe=False, status=400)


@csrf_exempt
def delete_comment(request, comment_id):
    if request.user.__class__.__name__ == 'AnonymousUser':
        return JsonResponse('You must be logged-in!', safe=False, status=401)

    selected_comment = Comment.objects.get(pk=comment_id)

    if request.user.id != selected_comment.commentator_id:
        return JsonResponse('You can delete only your own comments!', safe=False, status=403)

    selected_comment.delete()
    return JsonResponse('Comment deleted successfully!', safe=False, status=202)
