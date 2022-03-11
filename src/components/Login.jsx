import { CircularProgress } from '@mui/material'
import { Box } from '@mui/system'
import { useState } from 'react'
import { GoogleLogin } from 'react-google-login'
import { useNavigate } from "react-router-dom"
import { api } from '../api/api'
import useAuth from '../hooks/useAuth'


function Login() {
    const [loggingIn, setLoggingIn] = useState(false)
    const navigate = useNavigate()
    const { setIsAuth } = useAuth()

    const onGoogleLoginSuccess = async res => {
        setLoggingIn(true)

        const body = {
            token: res.accessToken,
            backend: 'google-oauth2',
            grant_type: 'convert_token',
            client_id: 'sz8z14oUhS1fd0yEqWp38vzoM3f9VrJQ2Fe5JEkI',
            client_secret: '5ZYLS56MgsSftQq4Tn3ISamn9sQ8mBvybfRslK0HCYLTXteCJF9MpXl3RILdrWeXlRAq8tRHtv34hi1xaRkHrtey28FThhZOezSBAGeNRQKEBrp7NRnSoaI0OeWNfX1m'
        }
        const options = {
            method: 'POST',
            headers: new Headers({
                'content-Type': 'application/json',
            }),
            body: JSON.stringify(body)
        }

        const response = await fetch('http://localhost:8000/auth/convert-token', options)
        const data = await response.json()

        localStorage.setItem('access_token', data.access_token)
        localStorage.setItem('refresh_token', data.refresh_token)
        localStorage.setItem('is_auth', true)

        api.defaults.headers['Authorization'] = `Bearer ${data.access_token}`
        setIsAuth(true)
        navigate('/')
    }

    const onGoogleLoginFailure = (error) => {
        console.error(error)
        setIsAuth(false)
        localStorage.setItem('is_auth', false)
    }

    if (loggingIn) {
        return (
            <Box
                display="flex"
                justifyContent="center"
                alignItems="center"
            >
                <CircularProgress />
            </Box>
        )
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
