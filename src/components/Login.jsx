import { GoogleLogin } from 'react-google-login'
import { useNavigate } from "react-router-dom"
import { api } from '../api/api'
import useAuth from '../hooks/useAuth'
import useUser from '../hooks/useUser'


const fetchUser = async () => {
    const options = {
        method: 'GET',
        headers: new Headers({
            Authorization: 'Bearer ' + localStorage.getItem('access_token'),
            'content-Type': 'application/json',
        }),
    }

    const response = await fetch('http://localhost:8000/api/user_details', options)
    const data = await response.json()
    return data
}


function Login() {
    const navigate = useNavigate()
    const { setIsAuth } = useAuth()
    const { setUser } = useUser()

    const onGoogleLoginSuccess = async res => {
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

        setIsAuth(true)
        localStorage.setItem('access_token', data.access_token)
        localStorage.setItem('refresh_token', data.refresh_token)
        localStorage.setItem('is_auth', true)

        api.defaults.headers['Authorization'] = `Bearer ${data.access_token}`

        const user = await fetchUser()
        setUser(user)
        localStorage.setItem('user', JSON.stringify(user))
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
