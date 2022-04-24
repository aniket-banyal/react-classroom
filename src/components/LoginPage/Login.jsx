import { useState } from 'react'
import { GoogleLogin } from 'react-google-login'
import { useNavigate } from "react-router-dom"
import { api } from "../../api"
import useAuth from '../../hooks/useAuth'
import CenteredCircularProgress from '../shared/CenteredCircularProgress'


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
            client_id: process.env.REACT_APP_DJANGO_CLIENT_ID,
            client_secret: process.env.REACT_APP_DJANGO_CLIENT_SECRET
        }
        const options = {
            method: 'POST',
            headers: new Headers({
                'content-Type': 'application/json',
            }),
            body: JSON.stringify(body)
        }

        const response = await fetch(`${process.env.REACT_APP_DJANGO_AUTH_URL}/convert-token`, options)
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
            <CenteredCircularProgress />
        )
    }

    return (
        <GoogleLogin
            clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
            buttonText="Sign in with Google"
            onSuccess={onGoogleLoginSuccess}
            onFailure={onGoogleLoginFailure}
            isSignedIn={true}
        />
    )
}

export default Login
