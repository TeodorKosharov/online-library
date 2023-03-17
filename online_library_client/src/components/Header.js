import styles from "./Header.module.css";
import {Link} from "react-router-dom";

export const Header = () => {
    return (
        <header className={styles.header}>
            <p className={styles.title}>
                <Link className={styles.link} to='/'>
                    Online library &nbsp;<i className="fa-solid fa-book"></i>
                </Link>
            </p>
            <nav className={styles.navi}>
                <ul className={styles.list}>
                    <Link className={styles.link} to='/login'>
                        <li className={styles.listItem}>Login <i className="fa-solid fa-right-to-bracket"></i></li>
                    </Link>

                    <Link className={styles.link} to='/register'>
                        <li className={styles.listItem}>Register <i className="fa-solid fa-address-card"></i></li>
                    </Link>
                </ul>
            </nav>
        </header>
    );
}