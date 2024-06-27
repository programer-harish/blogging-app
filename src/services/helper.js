import axios from "axios";
import { getToken } from "../components/auth";
import * as Constants from "../utils/constants"

export const BASE_URL = Constants.API_GATEWAY+Constants.BLOG_API

export const apiCaller = axios.create({
    baseURL:BASE_URL
})
export const privateApiCaller = axios.create({
    baseURL:BASE_URL
})

privateApiCaller.interceptors.request.use(config=>{
    const token= getToken()
    if (token) {
        config.headers['Authorization']= `Bearer ${token}`
        return config
    }
}, error=>Promise.reject(error))