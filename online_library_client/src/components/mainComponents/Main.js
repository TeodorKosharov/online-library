import styles from "../componentsStyles/Main.module.css";
import {Route, Routes} from "react-router-dom";
import {LoginPage} from "../../pages/userPages/LoginPage";
import {RegisterPage} from "../../pages/userPages/RegisterPage";
import {CatalogPage} from "../../pages/bookPages/CatalogPage";
import {CreatePage} from "../../pages/bookPages/CreatePage";
import {ProfilePage} from "../../pages/userPages/ProfilePage";
import {DetailsPage} from "../../pages/bookPages/DetailsPage";
import {EditPage} from "../../pages/bookPages/EditPage";
import {RouteGuard} from "../userComponents/RouteGuard";
import {NotFoundPage} from "../../pages/NotFoundPage";

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
