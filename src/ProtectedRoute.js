// ProtectedRoute.js
import { Navigate, Outlet } from 'react-router-dom';
import { useContext } from 'react';
import AuthContext from './AuthContext';

function ProtectedRoute() {
    const { isAuthenticated } = useContext(AuthContext);

    if (isAuthenticated) {
        return <Outlet />;
    }

    return <Navigate to="/login" replace />;
}

export default ProtectedRoute;
