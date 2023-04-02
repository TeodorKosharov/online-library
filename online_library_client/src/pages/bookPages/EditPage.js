import React from 'react';
import {useParams} from "react-router-dom";
import {BookForm} from "../../components/bookComponents/BookForm";

export const EditPage = () => {
    const {bookId, bookTitle, bookDescription, bookGenre, bookImg} = useParams();

    return (
        <BookForm data={{
            method: 'PUT',
            endpoint: `edit-book/${bookId}`,
            bookTitle,
            bookDescription,
            bookGenre,
            bookImg,
            buttonText: 'Update book'
        }}/>
    );
}