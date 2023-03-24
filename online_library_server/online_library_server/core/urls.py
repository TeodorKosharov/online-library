from django.urls import path
from online_library_server.core.views import get_books, add_book, edit_book, delete_book, details_book, \
    get_comments, add_comment, delete_comment

urlpatterns = (
    path('get-books/', get_books),
    path('add-book/', add_book),
    path('edit-book/<int:book_id>/', edit_book),
    path('delete-book/<int:book_id>/', delete_book),
    path('details-book/<int:book_id>/', details_book),

    path('get-comments/<int:book_id>/', get_comments),
    path('add-comment/', add_comment),
    path('delete-comment/<int:comment_id>/', delete_comment)
)
