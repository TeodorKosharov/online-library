import styles from "./BaseStyles.module.css";
import React from "react";
import {useNavigate} from "react-router-dom";
import {customAlert} from "../utils/customAlert";
import {TokenContext} from "../contexts/TokenContext";
import {useContext} from "react";
import {customFetch} from "../utils/customFetch";
import {LoginForm} from "../components/LoginForm";

export const LoginPage = () => {
    const [username, setUsername] = React.useState('');
    const [password, setPassword] = React.useState('');

    return (
        <div className={styles.loginContainer}>
            <LoginForm data={{username, setUsername, password, setPassword}} />
        </div>
    );
}