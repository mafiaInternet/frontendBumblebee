import axios from "axios"

export const API_BASE_URL = 'https://bumblebee-va86.onrender.com'

const jwt = localStorage.getItem("jwt")

export const api=axios.create({
    baseURL: API_BASE_URL,
    credentials: 'include',
    headers:{
        "Authorization": `Bearer ${jwt}`,
        "Content-Type": "application/json",

    }
})

export const apiBase = axios.create({
    baseURL: API_BASE_URL,
    headers:{
        "Content-Type": "application/json",

    }
})

