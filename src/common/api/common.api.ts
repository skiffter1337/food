import axios from "axios";

export const getToken = () => localStorage.getItem('token')

export const instance = axios.create({
    baseURL: 'https://food-api-yra2.onrender.com',
    withCredentials: true,
})

instance.interceptors.request.use(config => {
    const token = getToken()
    if (token) {
        config.headers.Authorization = `Bearer ${token}`
    }
    return config
})