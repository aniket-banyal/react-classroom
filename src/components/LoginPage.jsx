import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import useAuth from "../hooks/useAuth"
import Login from "./Login"

function LoginPage() {
    const navigate = useNavigate()
    const { isAuth } = useAuth()

    useEffect(() => {
        if (isAuth)
            navigate('/')
    }, [isAuth])

    return (
        <div>
            {!isAuth &&
                <>
                    <h2>Login to classroom</h2>
                    <Login />
                </>
            }
        </div>
    )
}

export default LoginPage
