import { Navigate, Outlet } from 'react-router-dom'
import { getToken } from '../stores/TokenLocal'

const PublicRoutes = () => {
    const token = getToken();

    return (
        !token ? <Outlet /> : <Navigate to="/" />
    )
}

export default PublicRoutes