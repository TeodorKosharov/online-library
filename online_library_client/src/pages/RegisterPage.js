import styles from "./BaseStyles.module.css";
import React from "react";
import {RegisterForm} from "../components/RegisterForm";

export const RegisterPage = () => {
    const [username, setUsername] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [confirmPassword, setConfirmPassword] = React.useState('');


    return (<div className={styles.loginContainer}>
        <RegisterForm data={{
            username, setUsername, password, setPassword, confirmPassword, setConfirmPassword
        }}/>
    </div>);
}