import { Outlet, useParams } from "react-router-dom"
import useUserRole from "../hooks/api/useUserRole"

function Base() {
    const { code } = useParams()
    //calling to fetch role for classroom once only, in child components it'll be fetched from cache
    useUserRole(code)

    return (
        <Outlet />
    )
}

export default Base
