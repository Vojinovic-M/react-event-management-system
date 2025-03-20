import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAppSelector } from "../../store/hooks";

export default function ProtectedAdminRoute() {
    const location = useLocation();
    const { user } = useAppSelector((state) => state.auth)

    if (user && user.roles?.includes('Admin')) {
        return <Outlet/>
    }

    return <Navigate to="/unauthorized" state={{ from: location }} replace />
}