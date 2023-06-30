import axios from "axios"

const baseURL = import.meta.env.VITE_API_URL;

export const publicApi = axios.create({
    baseURL,
    headers:{
        "Content-type": "application/json"
    },
})

export let privateApi

export const setupPrivateApi = (token) => {
    privateApi = axios.create({
        baseURL,
        headers: {
            "Content-type": "application/json",
            Authorization: `Bearer ${token}`
        }
    })
}



