import styles from "./Main.module.css";
import {Route, Routes} from "react-router-dom";
import {LoginPage} from "../pages/LoginPage";
import {RegisterPage} from "../pages/RegisterPage";
import {CatalogPage} from "../pages/CatalogPage";
import {CreatePage} from "../pages/CreatePage";
import {ProfilePage} from "../pages/ProfilePage";
import {DetailsPage} from "../pages/DetailsPage";
import {EditPage} from "../pages/EditPage";
import {RouteGuard} from "./RouteGuard";
import {NotFoundPage} from "../pages/NotFoundPage";

export const Main = () => {

    return (
        <main className={styles.main}>
            <Routes>
                <Route path='*' element={<NotFoundPage/>}></Route>
                <Route path='/' element={<CatalogPage/>}></Route>
                <Route path='/login' element={<LoginPage/>}></Route>
                <Route path='/register' element={<RegisterPage/>}></Route>
                <Route path='/profile' element={<RouteGuard><ProfilePage/></RouteGuard>}></Route>
                <Route path='/create' element={<RouteGuard><CreatePage/></RouteGuard>}></Route>
                <Route path='/details/:bookId' element={<DetailsPage/>}></Route>
                <Route path='/edit/:bookId/:bookTitle/:bookDescription/:bookGenre/:bookImg'
                       element={<RouteGuard><EditPage/></RouteGuard>}></Route>
            </Routes>
        </main>
    );
}
