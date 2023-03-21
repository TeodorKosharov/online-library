import styles from "./BaseStyles.module.css";
import React from "react";
import {useNavigate} from "react-router-dom";
import {customAlert} from "../utils/customAlert";

export const RegisterPage = () => {
    const [username, setUsername] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [confirmPassword, setConfirmPassword] = React.useState('');
    const navigate = useNavigate();

    let usernameInputClasses = `${styles.input}`;
    let passwordInputClasses = `${styles.input}`;
    let confPasswordInputClasses = `${styles.input}`;

    if (username.length >= 1 && username.length <= 3) {
        usernameInputClasses += ` ${styles.invalid}`;
    }

    if (password.length < 8 && password.length >= 1) {
        passwordInputClasses += ` ${styles.invalid}`;
    }

    if (confirmPassword.length < 8 && confirmPassword.length >= 1) {
        confPasswordInputClasses += ` ${styles.invalid}`;
    }

    function onUsernameChange(event) {
        setUsername(event.target.value);
    }

    function onPasswordChange(event) {
        setPassword(event.target.value);
    }

    function onConfirmPasswordChange(event) {
        setConfirmPassword(event.target.value);
    }

    function submitForm(event) {
        event.preventDefault();
        let errors = '';
        if ((username.length >= 1 && username.length <= 3)) errors += '<p>Username is too short!</p>';
        if (password.length < 8) errors += '<p>Password is too short!</p>';
        if (password !== confirmPassword) errors += '<p>Passwords did not match!</p>';
        errors
            ? customAlert('error', 'Oops...', null, errors)
            : fetch('http://127.0.0.1:8000/account/register/', {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({username, password})
            }).then((response) => response.json()).then((data) => {
                if (data === 'User registered successfully!') {
                    customAlert('success', 'Success', 'You have registered successfully!')
                        .then(() => {
                            navigate(('/'));
                        });
                } else {
                    customAlert('error', 'Oops...', data[0][0]);
                }
            });
    }

    return (<div className={styles.loginContainer}>
        <form className={styles.form} onSubmit={submitForm}>
            <label className={styles.label} htmlFor="username">Username</label>
            <input
                className={usernameInputClasses}
                type="text"
                id="username"
                placeholder="Between 4 and 10 chars"
                required={true}
                maxLength={10}
                value={username}
                onChange={onUsernameChange}/>

            <label className={styles.label} htmlFor="password">Password</label>
            <input
                className={passwordInputClasses}
                type="password"
                id="password"
                placeholder="Longer than 7 chars"
                required={true}
                value={password}
                onChange={onPasswordChange}/>

            <label className={styles.label} htmlFor="confirm-password">Confirm password</label>
            <input
                className={confPasswordInputClasses}
                type="password"
                id="confirm-password"
                placeholder="Same as your password"
                required={true}
                value={confirmPassword}
                onChange={onConfirmPasswordChange}/>

            <button className={styles.button}>Register</button>
        </form>
    </div>);
}