import styles from "./BaseStyles.module.css";
import React from 'react';
import {customAlert} from "../utils/customAlert";

export const CreatePage = () => {
    const [title, setTitle] = React.useState('');
    const [description, setDescription] = React.useState('');
    const [imageUrl, setImageUrl] = React.useState('');

    let titleInputClasses = `${styles.input}`;
    let descriptionInputClasses = `${styles.input}`;

    if (title.length < 3 && title.length >= 1) {
        titleInputClasses += ` ${styles.invalid}`;
    }

    if (description.length < 10 && description.length >= 1) {
        descriptionInputClasses += ` ${styles.invalid}`;
    }

    function onTitleChange(event) {
        setTitle(event.target.value);
    }

    function onDescriptionChange(event) {
        setDescription(event.target.value);
    }

    function onImageUrlChange(event) {
        setImageUrl(event.target.value);
    }

    function onFormSubmit(event) {
        event.preventDefault();
        setTitle('');
        setDescription('');
        setImageUrl('');
        const userId = Number(localStorage.getItem('userId'));
        const token = localStorage.getItem('token');
        let errors = '';

        if (title.length >= 1 && title.length <= 3) errors += '<p>Title is too short!</p>';
        if (description.length >= 1 && description.length < 10) errors += '<p>Description is too short!</p>';
        errors
            ? customAlert('error', 'Oops...', null, errors)
            : fetch('http://127.0.0.1:8000/core/add-book/', {
                method: 'POST',
                headers: {'Content-Type': 'application/json', 'Authorization': `Token ${token}`},
                body: JSON.stringify({title, description, 'image_url': imageUrl, 'creator_id': userId})
            })
                .then((response) => response.json())
                .then((data) => {
                    if (data === 'Book created successfully!') customAlert('success', 'Success', data, null);
                    else customAlert('error', 'Oops...', data[0][0], null);
                })
    }

    return (<>
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

            <label className={styles.label} htmlFor="imageUrl">Image URL</label>
            <input
                className={styles.input}
                type="url"
                id="title"
                placeholder="Enter valid image url"
                required={true}
                value={imageUrl}
                onChange={onImageUrlChange}/>

            <button className={styles.button}>Add to library</button>
        </form>
    </>);
}