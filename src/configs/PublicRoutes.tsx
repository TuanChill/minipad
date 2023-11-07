import { Navigate, Outlet } from 'react-router-dom'
import {useContext} from "react";
import { AuthContext } from '../context/AuthProvider';

const PublicRoutes = () => {
    const auth = useContext(AuthContext);
    console.log(auth)

    return (
        !auth?.user ? <Outlet /> : <Navigate to="/" />
    )
}

export default PublicRoutes