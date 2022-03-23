import axios from "axios";

const baseURL = 'http://localhost:8000/api'

const api = axios.create({
    baseURL: baseURL,
    headers: {
        Authorization: localStorage.getItem('access_token') ?
            `Bearer ${localStorage.getItem('access_token')}` : undefined,
        'Content-Type': 'application/json',
    }
})

api.interceptors.response.use(
    response => response,
    async (error) => {
        if (error.response.status === 401) {
            const body = {
                refresh_token: localStorage.getItem('refresh_token'),
                grant_type: 'refresh_token',
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

            const response = await fetch('http://localhost:8000/auth/token', options)
            const data = await response.json()

            localStorage.setItem('access_token', data.access_token)
            localStorage.setItem('refresh_token', data.refresh_token)
            localStorage.setItem('is_auth', true)

            api.defaults.headers['Authorization'] = `Bearer ${data.access_token}`
        }
        else {
            throw error
        }
    }
)

export { api }