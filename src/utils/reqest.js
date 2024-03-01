import axios from 'axios'
import { getToken } from './token'

const service = axios.create({
    baseURL:"http://localhost:8000/",
    timeout:5000
})

service.interceptors.request.use(config =>{
    //头部携带有token
    config.headers['token']= getToken() || {}
    return config
})

service.interceptors.response.use(response =>{
    return response
},err=>{
    return Promise.reject(err)
})

export default service