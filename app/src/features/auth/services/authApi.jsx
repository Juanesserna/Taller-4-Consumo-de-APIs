import axios from 'axios';

const isProd = impor.meta.env.PROD;

const api = axios.create({
    baseURL: isProd
        ? import.meta.env.VITE_API_URL
        : "http://localhost:3000/"
})

export const registerUser = (data) => api.post('/api/auth/registro', data);
export const loginUser = (data) => api.post('/api/auth/login', data);
