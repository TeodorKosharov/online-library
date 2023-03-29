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

export function getRegisterInputClasses(username, password, confirmPassword, initialClass, invalidClass) {
    let usernameInputClasses = initialClass;
    let passwordInputClasses = initialClass;
    let confPasswordInputClasses = initialClass;

    if (username.length >= 1 && username.length <= 3) {
        usernameInputClasses += ` ${invalidClass}`;
    }

    if (password.length < 8 && password.length >= 1) {
        passwordInputClasses += ` ${invalidClass}`;
    }

    if (confirmPassword.length < 8 && confirmPassword.length >= 1) {
        confPasswordInputClasses += ` ${invalidClass}`;
    }

    return [usernameInputClasses, passwordInputClasses, confPasswordInputClasses];
}