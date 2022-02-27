import axios from "axios";

const baseURL = 'http://localhost:8000/api'

export const api = axios.create({
    baseURL: baseURL,
    headers: {
        Authorization: localStorage.getItem('access_token') ?
            `Bearer ${localStorage.getItem('access_token')}` : undefined,
        'Content-Type': 'application/json',
    }
})
