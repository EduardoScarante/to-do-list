import axios from "axios"

export const publicApi = axios.create({
    baseURL: "http://localhost:3333",
    headers:{
        "Content-type": "application/json"
    },
})

export let privateApi

export const setupPrivateApi = (token) => {
    privateApi = axios.create({
        baseURL: "http://localhost:3333",
        headers: {
            "Content-type": "application/json",
            Authorization: `Bearer ${token}`
        }
    })
}



