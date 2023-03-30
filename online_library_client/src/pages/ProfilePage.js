import React from "react";
import styles from "./ProfileStyles.module.css";
import baseStyles from "./BaseStyles.module.css";
import {customFetch} from "../utils/customFetch";
import {getUserData} from "../utils/genericUtils";
import {BooksList} from "../components/BooksList";


export const ProfilePage = () => {
    const [books, setBooks] = React.useState([]);
    const [username, userId, token] = getUserData();

    React.useEffect(() => {
        customFetch('POST', {'user_id': userId}, 'core', `get-user-books/${userId}`, token)
            .then((response) => response.json())
            .then((data) => {
                setBooks(data);
            });
    }, []);

    return (
        <div className={styles.profileBox}>
            <h1 className={styles.heading}>Welcome, {username}</h1>
            <h2 className={styles.heading}>Your books:</h2>
            <BooksList data={{books, setBooks, userId, token, styles, baseStyles}}/>
        </div>);
}