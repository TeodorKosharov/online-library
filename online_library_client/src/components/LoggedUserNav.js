import styles from "./Header.module.css";
import {Link} from "react-router-dom";
import {useNavigate} from "react-router-dom";

export const LoggedUserNav = (props) => {
    const navigate = useNavigate();
    function logout() {
        sessionStorage.clear();
        props.updateToken(sessionStorage.getItem('token'));
        navigate(('/'));
    }

    return (
        <>
            <Link className={styles.link} to='/profile'>
                <li className={styles.listItem}>Profile <i className="fa-solid fa-user"></i>
                </li>
            </Link>

            <li className={styles.listItem} onClick={logout}>Logout <i
                className="fa-solid fa-right-from-bracket"></i>
            </li>
        </>
    );
}