import { Box } from "@mui/system"
import { Outlet, useParams } from "react-router-dom"
import useUserRole from "../hooks/api/useUserRole"

function Base() {
    const { code } = useParams()
    //calling to fetch role for classroom once only, in child components it'll be fetched from cache
    useUserRole(code)

    return (
        <Box
            sx={{
                px: 10,
                pt: 5,
                pb: 12,
            }}
        >
            <Outlet />
        </Box>
    )
}

export default Base
