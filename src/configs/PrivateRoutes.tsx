import { Outlet, Navigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthProvider';
import {useContext} from "react";

const PrivateRoutes = () => {
    const auth = useContext(AuthContext);
    console.log(auth)
    return (
        auth?.user ? <Outlet /> : <Navigate to="/login" replace/>
    )
}

export default PrivateRoutes