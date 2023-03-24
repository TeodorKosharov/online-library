import styles from "./Main.module.css";
import {Route, Routes} from "react-router-dom";
import {LoginPage} from "../pages/LoginPage";
import {RegisterPage} from "../pages/RegisterPage";
import {CatalogPage} from "../pages/CatalogPage";
import {CreatePage} from "../pages/CreatePage";
import {ProfilePage} from "../pages/ProfilePage";
import {DetailsPage} from "../pages/DetailsPage";

export const Main = () => {

    return (
        <main className={styles.main}>
            <Routes>
                <Route path='/' element={<CatalogPage/>}></Route>
                <Route path='/login' element={<LoginPage/>}></Route>
                <Route path='/register' element={<RegisterPage/>}></Route>
                <Route path='/profile' element={<ProfilePage/>}></Route>
                <Route path='/create' element={<CreatePage/>}></Route>
                <Route path='/details/:bookId' element={<DetailsPage/>}></Route>
            </Routes>
        </main>
    );
}
