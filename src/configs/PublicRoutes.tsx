import { Navigate, Outlet } from 'react-router-dom'

const PublicRoutes = () => {
    const token = localStorage.getItem('access_token') || false;

    return (
        !token ? <Outlet /> : <Navigate to="/" />
    )
}

export default PublicRoutes