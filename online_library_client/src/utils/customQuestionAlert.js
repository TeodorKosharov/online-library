import Swal from "sweetalert2";
import styles from "../pages/BaseStyles.module.css";
import baseStyles from "../pages/BaseStyles.module.css";
import {customAlert} from "./customAlert";

export function customQuestionAlert(title, input, endpoint, token, requestBody, customAlertInfo) {
    if (input === 'text') {
        return Swal.fire({
            title,
            input: 'text',
            showDenyButton: true,
            buttonsStyling: false,
            denyButtonText: 'Cancel',
            confirmButtonText: 'Continue',
            customClass: {
                title: `${baseStyles.swalTitle}`,
                container: `${baseStyles.swalErrors}`,
                confirmButton: `${baseStyles.button}`,
                denyButton: `${baseStyles.button} ${baseStyles.swalDenyBtn}`,
                input: `${baseStyles.swalInput}`
            }, preConfirm(inputValue) {
                requestBody['comment_description'] = inputValue;
                return fetch(`http://127.0.0.1:8000/core/${endpoint}/`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Token ${token}`
                    }, body: JSON.stringify(requestBody)
                })
                    .then((response) => response.json())
                    .then((data) => {
                        if (typeof data === 'object') customAlert(
                            customAlertInfo.icon, customAlertInfo.title, customAlertInfo.text, null);

                    })
            }
        });
    }

    return Swal.fire({
        title,
        showDenyButton: true,
        confirmButtonText: 'Yes',
        buttonsStyling: false,
        denyButtonText: `Cancel`,
        customClass: {
            title: `${styles.swalTitle}`,
            container: `${styles.swalErrors}`,
            confirmButton: `${styles.button}`,
            denyButton: `${styles.button} ${styles.swalDenyBtn}`
        }
    });
}

