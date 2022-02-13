import axios from 'axios'

import { GoogleLogin } from 'react-google-login'
import { useNavigate } from "react-router-dom"
import useAuth from '../hooks/useAuth'


function Login() {
    console.log('Login')
    const navigate = useNavigate()
    const { setIsAuth } = useAuth()

    const onGoogleLoginSuccess = async res => {
        const accessToken = res.accessToken
        const response = await axios.post('http://localhost:8000/auth/convert-token', {
            token: accessToken,
            backend: 'google-oauth2',
            grant_type: 'convert_token',
            client_id: 'sz8z14oUhS1fd0yEqWp38vzoM3f9VrJQ2Fe5JEkI',
            client_secret: '5ZYLS56MgsSftQq4Tn3ISamn9sQ8mBvybfRslK0HCYLTXteCJF9MpXl3RILdrWeXlRAq8tRHtv34hi1xaRkHrtey28FThhZOezSBAGeNRQKEBrp7NRnSoaI0OeWNfX1m',
        })

        localStorage.setItem('access_token', response.data.access_token)
        localStorage.setItem('refresh_token', response.data.refresh_token)
        localStorage.setItem('is_auth', true)
        setIsAuth(true)
        navigate('/')
    }

    const onGoogleLoginFailure = (error) => {
        console.error(error)
        setIsAuth(false)
        localStorage.setItem('is_auth', false)
    }


    return (
        <GoogleLogin
            clientId='411542087259-8ets43a5n6tu5qkmrfnauep52kh9uij0.apps.googleusercontent.com'
            // clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
            buttonText="Sign in with Google"
            onSuccess={onGoogleLoginSuccess}
            onFailure={onGoogleLoginFailure}
            isSignedIn={true}
        />
    )
}

export default Login
