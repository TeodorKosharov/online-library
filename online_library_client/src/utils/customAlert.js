import Swal from "sweetalert2";
import styles from "../pages/BaseStyles.module.css";

export function customAlert(icon, title, text, html) {
    if (html) {
        return Swal.fire({
            icon, title, html, buttonsStyling: false, customClass: {
                title: `${styles.swalTitle}`,
                container: `${styles.swalErrors}`,
                confirmButton: `${styles.button}`
            }
        });
    }
    return Swal.fire({
        icon, title, text, buttonsStyling: false, customClass: {
            title: `${styles.swalTitle}`,
            container: `${styles.swalErrors}`,
            confirmButton: `${styles.button}`
        }
    });
}

