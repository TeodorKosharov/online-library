import styles from "../pagesStyles/CatalogStyles.module.css";
import baseStyles from "../pagesStyles/BaseStyles.module.css";
import React from "react";
import {getUserData} from "../../utils/genericUtils";
import {BooksList} from "../../components/bookComponents/BooksList";
import {FilterForm} from "../../components/bookComponents/FilterForm";

export const CatalogPage = () => {
    const [books, setBooks] = React.useState([]);
    const [genre, setGenre] = React.useState('fiction');
    const [formFilter, setFormFilter] = React.useState('None');
    const [, userId, token] = getUserData();

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


    return (
        <div className={styles.wrapper}>
            <div className={styles.settingsBox}>
                <FilterForm data={{genre, setGenre, setFormFilter, styles, baseStyles}} />
            </div>
            <BooksList data={{books, setBooks, userId, token, styles, baseStyles}}/>
        </div>
    );
}