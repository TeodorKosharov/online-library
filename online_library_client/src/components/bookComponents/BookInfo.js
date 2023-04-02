import styles from "../../pages/pagesStyles/DetailsStyles.module.css";
import React from "react";

export const BookInfo = (props) => {
    return (
        <div className={styles.bookInfo}>
            <p className={styles.heading}>Title</p>
            <p className={styles.paragraph}>{props.book.title}</p>

            <p className={styles.heading}>Description</p>
            <p className={styles.paragraph}>{props.book.description}</p>

            <p className={styles.heading}>Genre</p>
            <p className={styles.paragraph}>{props.book.genre}</p>
        </div>
    );
}