
import axios from "axios";

export const api = axios.create({
    baseURL: "http://localhost:5000",
})

api.interceptors.request.use(config => {
    return config
})
api.interceptors.response.use(resp => {
    return resp
}, (error) => {
    throw error.response
})

export default api