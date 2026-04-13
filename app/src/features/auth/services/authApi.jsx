import axios from 'axios';

const isProd = import.meta.env.PROD;

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL || "http://localhost:3000/"
})

console.log('API URL:', import.meta.env.VITE_API_URL)
console.log('IS PROD:', import.meta.env.PROD)
console.log('ENV:', import.meta.env)

export const registerUser = (data) => api.post('/api/auth/registro', data);
export const loginUser = (data) => api.post('/api/auth/login', data);

