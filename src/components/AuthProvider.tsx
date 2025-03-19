import { useEffect } from "react";
import { useAppDispatch } from "../store/hooks";
import { AuthService } from "../services/AuthService";
import { loginSuccess, logout } from "../store/slices/authSlice";

export default function AuthProvider({children} : { children: React.ReactNode}) {
    const dispatch = useAppDispatch()

    useEffect(() => {
        const token = localStorage.getItem('accessToken')
        if (token) {
            AuthService.getProfile(token)
            .then(user => dispatch(loginSuccess({ user, token })))
            .catch(() => dispatch(logout()))
        }
    }, [dispatch])

    return <>{children}</>
}