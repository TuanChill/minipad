import { Outlet, Navigate } from 'react-router-dom';
import { getAccessToken } from '../stores/TokenLocal';

const PrivateRoutes = () => {
    const token = getAccessToken();
    return (
        token ? <Outlet /> : <Navigate to="/login" />
    )
}

export default PrivateRoutes