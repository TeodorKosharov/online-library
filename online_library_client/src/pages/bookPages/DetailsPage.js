import React from "react";
import styles from "../pagesStyles/DetailsStyles.module.css";
import {useParams} from "react-router-dom";
import {customFetch} from "../../utils/customFetch";
import {getUserData} from "../../utils/genericUtils";
import {Comments} from "../../components/bookComponents/Comments";
import {BookInfo} from "../../components/bookComponents/BookInfo";


export const DetailsPage = () => {
    const [book, setBook] = React.useState('');
    const {bookId} = useParams();
    const [userUsername, , token] = getUserData();

    React.useEffect(() => {
        customFetch('GET', undefined, 'core', `details-book/${Number(bookId)}`, null)
            .then((response) => response.json())
            .then((data) => setBook(data));
    }, []);

    return (
        <div className={styles.wrapper}>
            <div className={styles.bookBox}>
                <img className={styles.bookImg} src={book.imageUrl}/>
            </div>

            <div className={styles.infoBox}>
                <BookInfo book={book}/>
                <Comments data={{userUsername, token, bookId}}/>
            </div>
        </div>
    );
}