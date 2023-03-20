import styles from "./Main.module.css";
import {Route, Routes} from "react-router-dom";
import {LoginPage} from "../pages/LoginPage";
import {RegisterPage} from "../pages/RegisterPage";

export const Main = () => {


    return (
        <main className={styles.main}>
            <Routes>
                <Route path='/login' element={<LoginPage/>}></Route>
                <Route path='/register' element={<RegisterPage/>}></Route>
                <Route></Route>
            </Routes>
        </main>
    );
}
