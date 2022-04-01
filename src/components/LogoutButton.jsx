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
            clientId='411542087259-8ets43a5n6tu5qkmrfnauep52kh9uij0.apps.googleusercontent.com'
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
