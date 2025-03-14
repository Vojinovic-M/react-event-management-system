import { useEffect, useState } from "react";
import User from '../models/User';
import { AuthService } from "../services/AuthService";
import '../lib/navbar.css';
import AdminNavbar from "./navbar/AdminNavbar";
import UserNavbar from "./navbar/UserNavbar";
import GuestNavbar from "./navbar/GuestNavbar";
import { logoutUser } from "../redux/store/thunks/authThunks";
import { AsyncThunk, Dispatch, ThunkDispatch, UnknownAction } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";

export default function Header() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

    useEffect(() => {
        const tokenData = localStorage.getItem('user');
        if (!tokenData) {
            setLoading(false)
            return
        }

        try {
            const { accessToken } = JSON.parse(tokenData);
            AuthService.getProfile(accessToken)
            .then(setUser)
            .catch(() => setUser(null))
            .finally(() => setLoading(false))
        } catch (error) {
            console.error("Invalid user data in localStorage:", error)
            setUser(null)
            setLoading(false);
        }
    }, []);

    const handleLogout = async () => {
      AuthService.logout()
      .then(() => {
        localStorage.removeItem('user')
        setUser(null)
      })
      .catch((error) => console.error('Logout error: ', error))
    }

    if (loading) return <div className="loading-indicator">Loading...</div>;

    function dispatch(logoutUser: AsyncThunk<void, void, { state?: unknown; dispatch?: ThunkDispatch<unknown, unknown, UnknownAction>; extra?: unknown; rejectValue?: unknown; serializedErrorType?: unknown; pendingMeta?: unknown; fulfilledMeta?: unknown; rejectedMeta?: unknown; }>): void {
        throw new Error("Function not implemented.");
    }

    return (
        <header>
            {user ? (
                user.roles?.includes("Admin") ? (
                    <AdminNavbar user={user} onLogout={() => dispatch(logoutUser)}/>
                ) : (
                    <UserNavbar user={user} onLogout={handleLogout}/>
                )
            ) : (
                <GuestNavbar/>
            )}
        </header>
    )
}