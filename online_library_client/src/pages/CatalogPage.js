import styles from "./CatalogStyles.module.css";
import baseStyles from "./BaseStyles.module.css";
import React from "react";
import {customQuestionAlert} from "../utils/customQuestionAlert";
import {Link} from "react-router-dom";

export const CatalogPage = () => {
    const [books, setBooks] = React.useState([]);
    const [genre, setGenre] = React.useState('fiction');
    const [formFilter, setFormFilter] = React.useState('None');
    const userId = Number(localStorage.getItem('userId'));
    const token = localStorage.getItem('token');

    React.useEffect(() => {
        fetch('http://127.0.0.1:8000/core/get-books/')
            .then((response) => response.json())
            .then((data) => {
                setBooks(data);
            });
    }, []);

    React.useEffect(() => {
        fetch('http://127.0.0.1:8000/core/get-books/')
            .then((response) => response.json())
            .then((data) => {
                if (formFilter !== 'None') {
                    setBooks(data.filter(data => data.genre === formFilter));
                } else {
                    setBooks(data);
                }
            });
    }, [formFilter]);

    function onGenreChange(event) {
        setGenre(event.target.value);
    }

    function onFormSubmit(event) {
        event.preventDefault();
        setFormFilter(genre);
    }

    function deleteBook(bookId) {
        customQuestionAlert('Do you want to delete the book?', null)
            .then((result) => {
                if (result.isConfirmed) {
                    fetch(`http://127.0.0.1:8000/core/delete-book/${bookId}/`, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': `Token ${token}`
                        },
                        body: JSON.stringify({'book_id': bookId})
                    })
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
        <div className={styles.wrapper}>

            <div className={styles.settingsBox}>
                <form onSubmit={onFormSubmit}>
                    <label className={baseStyles.label} id="genre">Filter by genre </label>
                    <select className={baseStyles.select} id="genre" onClick={onGenreChange}>
                        <option>None</option>
                        <option>fiction</option>
                        <option>mystery</option>
                        <option>adventure</option>
                        <option>biography</option>
                    </select>
                    <button className={styles.filterBtn} title="Filter"><i className="fa-solid fa-filter"></i></button>
                </form>
            </div>

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
                                    <i className={`fa-solid fa-pen-to-square ${styles.actionBtn}`}
                                       title="Edit"></i>
                                    <i className={`fa-solid fa-trash ${styles.actionBtn}`}
                                       title="Delete" onClick={() => {
                                        deleteBook(book.id)
                                    }}></i>
                                </>
                                : null
                            }
                        </div>

                    </div>)}
            </div>

        </div>
    );
}