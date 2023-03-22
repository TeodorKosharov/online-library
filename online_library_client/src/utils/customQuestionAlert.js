import Swal from "sweetalert2";
import styles from "../pages/BaseStyles.module.css";

export function customQuestionAlert(title) {
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

