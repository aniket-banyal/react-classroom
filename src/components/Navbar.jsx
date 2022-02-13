import { GoogleLogout } from 'react-google-login'
import { useNavigate } from "react-router-dom"
import useAuth from '../hooks/useAuth'

function Navbar() {
    console.log('Navbar')
    const navigate = useNavigate()
    const { isAuth, setIsAuth } = useAuth()

    const onGoogleLogoutSuccess = (res) => {
        setIsAuth(false)
        localStorage.setItem('is_auth', false)
        localStorage.removeItem('access_token')
        localStorage.removeItem('refresh_token')
        navigate('/')
    }

    return (
        <div>
            {isAuth &&
                <GoogleLogout
                    clientId='411542087259-8ets43a5n6tu5qkmrfnauep52kh9uij0.apps.googleusercontent.com'
                    buttonText="Logout"
                    onLogoutSuccess={onGoogleLogoutSuccess}
                >
                </GoogleLogout>
            }
        </div>
    )

}

export default Navbar
