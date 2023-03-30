import React from "react";

export const FilterForm = (props) => {
    const {genre, setGenre, setFormFilter, styles, baseStyles} = props.data;

    function onGenreChange(event) {
        setGenre(event.target.value);
    }

    function onFormSubmit(event) {
        // After submitting the form, formFilter variable is being updated, which
        // causes re-render of the catalog component, because of the useEffect hook
        // on formFilter. After re-rendering we have the filtered books
        event.preventDefault();
        setFormFilter(genre);
    }

    return (
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
    );
}