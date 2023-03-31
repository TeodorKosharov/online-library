import {BookForm} from "../components/BookForm";

export const CreatePage = () => {
    return (
        <BookForm data={{
            method: 'POST',
            endpoint: 'add-book',
            bookId: '',
            bookTitle: '',
            bookDescription: '',
            bookGenre: 'fiction',
            bookImg: '',
            buttonText: 'Add book'
        }}/>
    );
}