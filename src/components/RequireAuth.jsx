import { useLocation, Navigate, Outlet } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import Navbar from "./Navbar/Navbar";

function RequireAuth() {
    const { isAuth } = useAuth()
    const location = useLocation()

    return (
        isAuth
            ?
            <>
                <Navbar />
                <Outlet />
            </>
            :
            <Navigate to="/login" state={{ from: location }} replace />
    )
}

export default RequireAuth
