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


export const getClassrooms = () => api.get('/classes').then(res => res.data)

export const createClassroom = (classroom) => api.post('/classes_teaching', { ...classroom })