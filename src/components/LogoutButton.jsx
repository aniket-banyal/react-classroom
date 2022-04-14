import { GoogleLogout } from 'react-google-login'
import { useQueryClient } from 'react-query';
import { useNavigate } from "react-router-dom"
import useAuth from "../hooks/useAuth"

function LogoutButton() {
    const { setIsAuth } = useAuth()
    const queryClient = useQueryClient()
    const navigate = useNavigate()

    const onGoogleLogoutSuccess = (res) => {
        setIsAuth(false)

        localStorage.setItem('is_auth', false)
        localStorage.removeItem('access_token')
        localStorage.removeItem('refresh_token')

        queryClient.removeQueries()

        navigate('/login')
    }


    return (
        <GoogleLogout
            clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
            buttonText="Logout"
            onLogoutSuccess={onGoogleLogoutSuccess}
            render={renderProps => (
                <div onClick={renderProps.onClick} disabled={renderProps.disabled}>
                    Logout
                </div>
            )}
        >
        </GoogleLogout>
    )
}

export default LogoutButton
