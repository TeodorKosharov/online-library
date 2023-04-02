import {Navigate} from "react-router-dom";

export const RouteGuard = ({children}) => {
    if (localStorage.getItem('token')) {
        return (
            <>
                {children}
            </>
        );
    }
    else {
        return <Navigate to='/login'></Navigate>
    }
}

