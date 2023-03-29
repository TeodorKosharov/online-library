export function getUserData() {
    return [localStorage.getItem('username'), Number(localStorage.getItem('userId')), localStorage.getItem('token')];
}

export function getInputClasses(title, description, initialClass, invalidClass) {
    let titleInputClasses = initialClass;
    let descriptionInputClasses = initialClass;

    if (title.length < 3 && title.length >= 1) {
        titleInputClasses += ` ${invalidClass}`;
    }

    if (description.length < 10 && description.length >= 1) {
        descriptionInputClasses += ` ${invalidClass}`;
    }

    return [titleInputClasses, descriptionInputClasses];
}