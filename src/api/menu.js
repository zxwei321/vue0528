import axios from "../utils/reqest"

//增加
export const add = (data)=>{
    return axios({
        method:"post",
        url:"/menu/add",
        data
    })
}

//删除
export const del = (id)=>{
    return axios({
        method:"delete",
        url:`/menu/del/${id}`,
    })
}

//修改
export const update = (data)=>{
    return axios({
        method:"put",
        url:`/menu/update`,
        data
    })
}
//获取列表
export const list = ()=>{
    return axios({
        method:"get",
        url:"/menu/list"
    })
}

//获取列表
export const lists = ()=>{
    return axios({
        method:"get",
        url:"/menu/lists"
    })
}
//获取分页列表
export const listPage = (pageNo,pageSize)=>{
    return axios({
        method:"get",
        url:`/menu/findByPage/${pageNo}/${pageSize}`
    })
}
//获取分页列表
export const listPageParams = (pageNo,pageSize,name)=>{
    return axios({
        method:"get",
        url:`/menu/findByPageParams/${pageNo}/${pageSize}/${name}`
    })
}



//获取对象
export const getInfo = (id)=>{
    return axios({
        method:"get",
        url:`/menu/findOne/${id}`,
        data
    })
}

//删除
export const dels = (ids)=>{
    return axios({
        method:"delete",
        url:`/menu/batch/${ids}`,
    })
}

//搜索 --- name
export const searchName = (name)=>{
    return axios({
        method:"get",
        url:`/menu/find/name`,
        params:{
            name:name
        }
    }) 
}
