import styles from "./Header.module.css";
import {Link} from "react-router-dom";
import {LoggedUserNav} from "./LoggedUserNav";
import {NotLoggedUserNav} from "./NotLoggedUserNav";
import {TokenContext} from "../contexts/TokenContext";
import {useContext} from "react";

export const Header = () => {
    const [token, setToken] = useContext(TokenContext);

    return (
        <header className={styles.header}>
            <p className={styles.title}>
                <Link className={styles.link} to='/'>
                    Online library &nbsp;<i className="fa-solid fa-book"></i>
                </Link>
            </p>
            <nav className={styles.navi}>
                <ul className={styles.list}>
                    {token ? <LoggedUserNav updateToken={setToken} /> : <NotLoggedUserNav/>}
                </ul>
            </nav>
        </header>
    );
}