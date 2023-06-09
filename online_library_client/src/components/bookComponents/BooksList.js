import {Link} from "react-router-dom";
import React from "react";
import {customQuestionAlert} from "../../utils/customQuestionAlert";
import {customFetch} from "../../utils/customFetch";

export const BooksList = (props) => {
    const {books, setBooks, userId, token, styles, baseStyles} = props.data;

    function deleteBook(bookId) {
        customQuestionAlert('Do you want to delete the book?', null)
            .then((result) => {
                if (result.isConfirmed) {
                    customFetch('DELETE', undefined, 'core', `delete-book/${bookId}`, token)
                        .then((response) => response.json())
                        .then((data) => {
                            if (data === 'Book deleted successfully!') {
                                const updatedBooks = books.filter(book => book.id !== bookId);
                                setBooks(updatedBooks);
                            }
                        });
                }
            })
    }

    return (
        <div className={styles.catalogBox}>
            {books.map(book =>
                <div className={styles.bookBox} key={book.id}>
                    <div className={styles.bookImageBox}>
                        <img className={styles.bookImage} src={book.image_url}/>
                    </div>

                    <div className={styles.bookInfoBox}>
                        <p>Title: <span>{book.title}</span></p>
                        <p>Genre: <span>{book.genre}</span></p>
                    </div>

                    <div className={styles.buttonsBox}>
                        <Link className={baseStyles.link} to={`/details/${book.id}`}>
                            <i className={`fa-solid fa-circle-info ${styles.actionBtn}`}
                               title="Details"></i>
                        </Link>

                        {userId === book.creator_id
                            ?
                            <>
                                <Link
                                    className={baseStyles.link}
                                    to={`/edit/${book.id}/${book.title}/${book.description}/${book.genre}/${encodeURIComponent(book.image_url)}`}><i
                                    className={`fa-solid fa-pen-to-square ${styles.actionBtn}`}
                                    title="Edit"></i>
                                </Link>
                                <i className={`fa-solid fa-trash ${styles.actionBtn}`}
                                   title="Delete"
                                   onClick={() => {
                                       deleteBook(book.id)
                                   }}>
                                </i>
                            </>
                            : null
                        }
                    </div>
                </div>)}
        </div>
    );
}