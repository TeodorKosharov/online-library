import styles from "../pages/BaseStyles.module.css";
import React from "react";
import {useNavigate} from "react-router-dom";
import {getInputClasses, getUserData} from "../utils/genericUtils";
import {customAlert} from "../utils/customAlert";
import {customFetch} from "../utils/customFetch";

export const BookForm = (props) => {
    const {method, endpoint, bookTitle, bookDescription, bookGenre, bookImg, buttonText} = props.data;
    const [title, setTitle] = React.useState(bookTitle);
    const [description, setDescription] = React.useState(bookDescription);
    const [genre, setGenre] = React.useState(bookGenre);
    const [imageUrl, setImageUrl] = React.useState(bookImg);
    const navigate = useNavigate();
    const [titleInputClasses, descriptionInputClasses] = getInputClasses(title, description, styles.input, styles.invalid);
    function onTitleChange(event) {
        setTitle(event.target.value);
    }

    function onDescriptionChange(event) {
        setDescription(event.target.value);
    }

    function onGenreChange(event) {
        setGenre(event.target.value);
    }

    function onImageUrlChange(event) {
        setImageUrl(event.target.value);
    }

    function onFormSubmit(event) {
        event.preventDefault();
        setTitle('');
        setDescription('');
        setImageUrl('');
        const [, userId, token] = getUserData();
        let errors = '';

        if (title.length >= 1 && title.length <= 3) errors += '<p>Title is too short!</p>';
        if (description.length >= 1 && description.length < 10) errors += '<p>Description is too short!</p>';
        errors
            ? customAlert('error', 'Oops...', null, errors)
            : customFetch(method, {
                title,
                description,
                genre,
                'image_url': imageUrl,
                'creator_id': userId
            }, 'core', endpoint, token)
                .then((response) => response.json())
                .then((data) => {
                    if (data === 'Book updated successfully!' || data === 'Book added successfully!') {
                        customAlert('success', 'Success', data, null)
                            .then((result) => {
                                if (result.isConfirmed) navigate(('/'));
                            });
                    } else customAlert('error', 'Oops...', data[0][0], null);
                });
    }

    return (
        <form className={styles.form} onSubmit={onFormSubmit}>
            <h1 className={styles.label}>Add book to library</h1>
            <label className={styles.label} htmlFor="title">Title</label>
            <input
                className={titleInputClasses}
                type="text"
                id="title"
                placeholder="Between 3 and 15 chars"
                required={true}
                maxLength={15}
                value={title}
                onChange={onTitleChange}/>

            <label className={styles.label} htmlFor="description">Description</label>
            <input
                className={descriptionInputClasses}
                type="text"
                id="description"
                placeholder="Between 10 and 100 chars"
                required={true}
                maxLength={100}
                value={description}
                onChange={onDescriptionChange}/>

            <label className={styles.label} htmlFor="genre">Genre</label>
            <select className={styles.select} id="genre" onClick={onGenreChange}>
                <option>fiction</option>
                <option>mystery</option>
                <option>adventure</option>
                <option>biography</option>
            </select>

            <label className={styles.label} htmlFor="imageUrl">Image URL</label>
            <input
                className={styles.input}
                type="url"
                id="title"
                placeholder="Enter valid image url"
                required={true}
                value={imageUrl}
                onChange={onImageUrlChange}/>

            <button className={styles.button}>{buttonText}</button>
        </form>
    );
}