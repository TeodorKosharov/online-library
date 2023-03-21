import styles from "./Header.module.css";
import baseStyles from "../pages/BaseStyles.module.css";
import {Link} from "react-router-dom";
import {useNavigate} from "react-router-dom";
import Swal from "sweetalert2";

export const LoggedUserNav = (props) => {
    const navigate = useNavigate();

    function logout() {
        Swal.fire({
            title: 'Do you want ot log out?',
            showDenyButton: true,
            confirmButtonText: 'Yes',
            denyButtonText: `Cancel`,
            buttonsStyling: false, customClass: {
                title: `${baseStyles.swalTitle}`,
                container: `${baseStyles.swalErrors}`,
                confirmButton: `${baseStyles.button}`,
                denyButton: `${baseStyles.button} ${baseStyles.swalDenyBtn}`
            }
        }).then((result) => {
            if (result.isConfirmed) {
                localStorage.clear();
                props.updateToken(localStorage.getItem('token'));
                navigate(('/'));
            }
        });
    }

    return (
        <>
            <Link className={styles.link} to='/profile'>
                <li className={styles.listItem}>Profile <i className="fa-solid fa-user"></i></li>
            </Link>

            <Link className={styles.link} to='/create'>
                <li className={styles.listItem}> Add book <i className="fa-solid fa-circle-plus"></i>
                </li>
            </Link>

            <li className={styles.listItem} onClick={logout}>Logout <i className="fa-solid fa-right-from-bracket"></i>
            </li>
        </>
    );
}