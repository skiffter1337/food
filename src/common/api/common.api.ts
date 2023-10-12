import axios from "axios";

export const instance = axios.create({
    baseURL: 'https://food-api-yra2.onrender.com',
    withCredentials: true,
})