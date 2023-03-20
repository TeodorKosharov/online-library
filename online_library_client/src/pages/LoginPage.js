import styles from "./AuthPages.module.css";
import React from "react";
import {useNavigate} from "react-router-dom";
import {customAlert} from "../utils/customAlert";

export const LoginPage = () => {
    const [username, setUsername] = React.useState('');
    const [password, setPassword] = React.useState('');
    const navigate = useNavigate();

    function onUsernameChange(event) {
        setUsername(event.target.value);
    }

    function onPasswordChange(event) {
        setPassword(event.target.value);
    }

    function submitForm(event) {
        event.preventDefault();

        fetch('http://127.0.0.1:8000/account/login/', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({username, password})
        })
            .then((response) => response.json())
            .then((data) => {
                if (data === 'User not found!') {
                    customAlert('error', 'Oops...', data);
                } else {
                    customAlert('success', 'Success', 'User logged-in successfully!')
                        .then(() => {
                            sessionStorage.setItem('token', data);
                            navigate(('/'));
                        });
                }
            })
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

                <button className={styles.button}>Login</button>
            </form>
        </div>
    );
}