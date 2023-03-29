import styles from "../pages/BaseStyles.module.css";
import React from "react";
import {customAlert} from "../utils/customAlert";
import {customFetch} from "../utils/customFetch";
import {useNavigate} from "react-router-dom";
import {getRegisterInputClasses} from "../utils/genericUtils";

export const RegisterForm = (props) => {
    const {username, setUsername, password, setPassword, confirmPassword, setConfirmPassword} = props.data;

    const navigate = useNavigate();
    const [usernameInputClasses, passwordInputClasses, confPasswordInputClasses] = getRegisterInputClasses(
        username, password, confirmPassword, styles.input, styles.invalid
    );

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
            : customFetch('POST', {username, password}, 'account', 'register', null)
                .then((response) => response.json())
                .then((data) => {
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

    return (
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
    );
}