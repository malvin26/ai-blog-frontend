import { Navigate, Outlet } from "react-router";

const AdminProtectedRoute = () => {
    const token = localStorage.getItem(
        "adminAccessToken"
    );

    return token ? (
        <Outlet />
    ) : (
        <Navigate to="/login" />
    );
};

export default AdminProtectedRoute;