import styles from "./Header.module.css";
import {Link} from "react-router-dom";
import {useNavigate} from "react-router-dom";
import {customQuestionAlert} from "../utils/customQuestionAlert";

export const LoggedUserNav = (props) => {
    const navigate = useNavigate();

    function logout() {
        customQuestionAlert('Do you want ot log out?').then((result) => {
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