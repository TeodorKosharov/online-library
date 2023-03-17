import styles from "./AuthPages.module.css";
import React from "react";
import {useNavigate} from "react-router-dom";

export const RegisterPage = () => {
    const [username, setUsername] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [confirmPassword, setConfirmPassword] = React.useState('');
    const navigate = useNavigate();

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
        navigate('/');
    }

    return (
        <div className={styles.loginContainer}>
            <form className={styles.form} onSubmit={submitForm}>
                <label className={styles.label} htmlFor="username">Username</label>
                <input
                    className={styles.input}
                    type="text"
                    id="username"
                    placeholder="John"
                    value={username}
                    onChange={onUsernameChange}/>

                <label className={styles.label} htmlFor="password">Password</label>
                <input
                    className={styles.input}
                    type="password"
                    id="password"
                    placeholder="******"
                    value={password}
                    onChange={onPasswordChange}/>

                <label className={styles.label} htmlFor="confirm-password">Confirm password</label>
                <input
                    className={styles.input}
                    type="password"
                    id="confirm-password"
                    placeholder="******"
                    value={confirmPassword}
                    onChange={onConfirmPasswordChange}/>

                <button className={styles.button}>Register</button>
            </form>
        </div>
    );
}