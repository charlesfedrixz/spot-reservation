import axios from "axios"

export const baseUrl = 'https://localhost:8000/api'
export const Axios = axios.create({
 baseURL:baseUrl
})
