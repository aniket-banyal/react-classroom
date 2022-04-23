import axios from "axios";


const api = axios.create({
    baseURL: process.env.REACT_APP_DJANGO_API_BASE_URL,
    headers: {
        Authorization: localStorage.getItem('access_token') ?
            `Bearer ${localStorage.getItem('access_token')}` : undefined,
        'Content-Type': 'application/json',
    }
})

let authTokenRequest;

// This function makes a call to get the auth token
// or it returns the same promise as an in-progress call to get the auth token
function getAuthToken() {
    if (!authTokenRequest) {
        authTokenRequest = makeAuthenticationRequest();
        authTokenRequest.then(resetAuthTokenRequest, resetAuthTokenRequest);
    }
    return authTokenRequest;
}

function resetAuthTokenRequest() {
    authTokenRequest = null;
}

function saveTokens(data) {
    localStorage.setItem('access_token', data.access_token)
    localStorage.setItem('refresh_token', data.refresh_token)
    localStorage.setItem('is_auth', true)

    api.defaults.headers['Authorization'] = `Bearer ${data.access_token}`
}

async function makeAuthenticationRequest() {
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
    if (response.status === 400)
        return null

    const data = await response.json()
    return data
}

api.interceptors.response.use(
    response => response,
    async (err) => {
        const error = err.response;

        if (error.status === 401 && error.config && !error.config.__isRetryRequest) {
            const data = await getAuthToken()
            if (data) {
                saveTokens(data);
                error.config.__isRetryRequest = true;
                return axios(error.config);
            }
        }

        else {
            throw error
        }
    }
)

export { api }