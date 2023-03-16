from django.urls import path
from online_library_server.core.views import get_books, add_book, edit_book, delete_book, add_comment, \
    edit_comment, delete_comment

urlpatterns = (
    path('get-books/', get_books),
    path('add-book/', add_book),
    path('edit-book/<int:book_id>/', edit_book),
    path('delete-book/<int:book_id>/', delete_book),

    path('add-comment/', add_comment),
    path('edit-comment/<int:comment_id>/', edit_comment),
    path('delete-comment/<int:comment_id>/', delete_comment)
)
