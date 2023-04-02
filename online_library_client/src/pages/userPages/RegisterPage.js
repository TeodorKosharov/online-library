import styles from "../pagesStyles/BaseStyles.module.css";
import React from "react";
import {RegisterForm} from "../../components/userComponents/RegisterForm";

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