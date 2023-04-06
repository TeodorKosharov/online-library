# Online library

Single page application, built with React and Django.

## Installation

Clone the repository

```
git clone https://github.com/TeodorKosharov/online-library.git
```

The server should be started first, because the client is fetching data from it. \
Navigate to <b>server's</b> directory. Install the required dependecies:

```
pip install -r requirements.txt
```

Start the development server at http://127.0.0.1:8000/:

```
python manage.py runserver
```

Both the server and the client are working on different ports. Additional configurations are made so that
the client and server can work together despite the different port.

Navigate to <b>client's</b> directory. There you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

## Server

### Endpoints:

- http://127.0.0.1:8000/account/register/ <br> <b>method</b>: POST, <b>body</b>: {username: ..., password: ...}
- http://127.0.0.1:8000/account/login/ <br> <b>method</b>: POST, <b>body</b>: {username: ..., password: ...}, <b>returns</b> {'token': ..., 'user_id': ..., 'username': ...}
- http://127.0.0.1:8000/core/get-books/ <br> <b>method</b>: GET, <b>returns</b> array of book objects
- http://127.0.0.1:8000/core/get-comments/book_id/ <br> <b>method</b>: GET, <b>returns</b> array of comment objects
- http://127.0.0.1:8000/core/details-book/book_id/ <br> <b>method</b>: GET, <b>returns</b> {'title': ..., 'description': ..., 'genre': ..., 'imageUrl: ...}

For the next endpoints you have to send the token with the request. Add the following string to the headers:
``` 
Authorization: Token ${token}
```

- http://127.0.0.1:8000/core/get-user-books/user_id/ <br> <b>method</b>: GET, <b>returns</b> array of user's book objects
- http://127.0.0.1:8000/core/add-book/ <br> <b>method</b>: POST, <b>body</b>: {title: ..., description: ..., genre: ..., image_url: ..., creator_id: ...}
- http://127.0.0.1:8000/core/edit-book/book_id/ <br> <b>method</b>: PUT, <b>body</b>: {title: ..., description: ..., genre: ..., image_url: ..., creator_id: ...}
- http://127.0.0.1:8000/core/delete-book/book_id/ <br> <b>method</b>: DELETE
- http://127.0.0.1:8000/core/add-comment/ <br> <b>method</b>: POST, <b>body</b>: {book_id: ...}
- http://127.0.0.1:8000/core/delete-comment/comment_id/ <br> <b>method</b>: DELETE






