import { JSX, useEffect, useState } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { AuthService } from "../services/AuthService";

export default function ProtectedAdminRoute({ children }: {children: JSX.Element}) {
    const [isAdmin, setIsAdmin] = useState<boolean | null>(null);
    const location = useLocation();

    useEffect(() => {
        const checkAdminStatus = async () => {
            try {
                const tokenData = localStorage.getItem('user')
                if (!tokenData) {
                    setIsAdmin(false)
                    return
                }
                const { accessToken } = JSON.parse(tokenData)
                const user = await AuthService.getProfile(accessToken)
                setIsAdmin(user?.roles?.includes('Admin') ?? false)
            } catch (error) {
                setIsAdmin(false);
            }
        };
        checkAdminStatus();
    }, []);

    if (isAdmin === null) {
        return <div className="text-7xl">Loading...</div>
    }

    return isAdmin ? children : <Navigate to="/unauthorized" state={{from: location}} replace></Navigate>
}