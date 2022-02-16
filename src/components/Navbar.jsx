import { GoogleLogout } from 'react-google-login'
import { useNavigate } from "react-router-dom"
import useAuth from '../hooks/useAuth'
import useUser from '../hooks/useUser'

function Navbar() {
    const navigate = useNavigate()
    const { isAuth, setIsAuth } = useAuth()
    const { user } = useUser()

    const onGoogleLogoutSuccess = (res) => {
        setIsAuth(false)
        localStorage.setItem('is_auth', false)
        localStorage.removeItem('access_token')
        localStorage.removeItem('refresh_token')
        localStorage.removeItem('user')
        navigate('/login')
    }

    return (
        <div>
            {isAuth &&
                <>
                    {user && <p> {user.name} ({user.email}) </p>}

                    <GoogleLogout
                        clientId='411542087259-8ets43a5n6tu5qkmrfnauep52kh9uij0.apps.googleusercontent.com'
                        buttonText="Logout"
                        onLogoutSuccess={onGoogleLogoutSuccess}
                    >
                    </GoogleLogout>
                </>
            }
        </div>
    )

}

export default Navbar
