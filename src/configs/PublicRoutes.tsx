import { Navigate, Outlet } from 'react-router-dom'
import { getAccessToken } from '../stores/TokenLocal'

const PublicRoutes = () => {
    const token = getAccessToken();

    return (
        !token ? <Outlet /> : <Navigate to="/" />
    )
}

export default PublicRoutes