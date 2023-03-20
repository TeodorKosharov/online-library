import styles from "./Header.module.css";
import {Link} from "react-router-dom";

export const NotLoggedUserNav = () => {
    return (
        <>
            <Link className={styles.link} to='/login'>
                <li className={styles.listItem}>Login <i className="fa-solid fa-right-to-bracket"></i>
                </li>
            </Link>

            <Link className={styles.link} to='/register'>
                <li className={styles.listItem}>Register <i className="fa-solid fa-address-card"></i>
                </li>
            </Link>
        </>
    );
}