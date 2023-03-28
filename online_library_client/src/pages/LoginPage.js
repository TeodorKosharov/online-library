import styles from "./BaseStyles.module.css";
import React from "react";
import {useNavigate} from "react-router-dom";
import {customAlert} from "../utils/customAlert";
import {TokenContext} from "../contexts/TokenContext";
import {useContext} from "react";
import {customFetch} from "../utils/customFetch";

export const LoginPage = () => {
    const [username, setUsername] = React.useState('');
    const [password, setPassword] = React.useState('');
    const navigate = useNavigate();
    const [token, setToken] = useContext(TokenContext);

    function onUsernameChange(event) {
        setUsername(event.target.value);
    }

    function onPasswordChange(event) {
        setPassword(event.target.value);
    }

    function submitForm(event) {
        event.preventDefault();
        customFetch('POST', {username, password}, 'account', 'login', null)
            .then((response) => response.json())
            .then((data) => {
                if (data === 'User not found!' || data === 'Incorrect password!') {
                    customAlert('error', 'Oops...', data);
                } else {
                    customAlert('success', 'Success', 'User logged-in successfully!')
                        .then(() => {
                            localStorage.setItem('token', data['token']);
                            localStorage.setItem('userId', data['user_id']);
                            localStorage.setItem('username', data['username']);
                            setToken(localStorage.getItem('token'));
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
                    required={true}
                    value={username}
                    onChange={onUsernameChange}/>

                <label className={styles.label} htmlFor="password">Password</label>
                <input
                    className={styles.input}
                    type="password"
                    id="password"
                    placeholder="******"
                    required={true}
                    value={password}
                    onChange={onPasswordChange}/>

                <button className={styles.button}>Login</button>
            </form>
        </div>
    );
}