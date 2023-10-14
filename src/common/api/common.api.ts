import axios from "axios";

const getToken = () => localStorage.getItem('token')


export const instance = axios.create({
    baseURL: 'https://food-api-yra2.onrender.com',
    withCredentials: true,
    headers: {
        'Authorization': 'Bearer ' + getToken()
    }
})