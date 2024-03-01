//存
export const setToken=(token)=>{
    return sessionStorage.setItem("token",token)
}
//取
export const getToken=()=>{
    return sessionStorage.getItem("token")
}
//删
export const removeToken=()=>{
    return sessionStorage.removeItem("token")
}