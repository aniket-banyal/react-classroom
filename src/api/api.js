import axios from "axios";


const api = axios.create({
    baseURL: process.env.REACT_APP_DJANGO_API_BASE_URL,
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

            const response = await fetch(`${process.env.REACT_APP_DJANGO_AUTH_URL}/token`, options)
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