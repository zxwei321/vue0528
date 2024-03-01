import axios from '../utils/reqest';


//新增
export const add = (data)=>{
    return axios({
        method:"post",
        url:"/org/add",
        data
    })
}
//删除
export const del = (id)=>{
    return axios({
        method:"delete",
        url:`/org/del/${id}`,
        
    })
}
//修改
export const update = (data)=>{
    return axios({
        method:"put",
        url:`/org/update`,
        data
        
    })
}
//获列更新对象
export const find = (id)=>{
    return axios({
        method:"get",
        url:`/org/find/${id}`,
        
    })
}
//获取列表
export const list = ()=>{
    return axios({
        method:"get",
        url:`/org/list`
    })
}
//搜索

export const searchParams = (name)=>{
    return axios({
        method:"get",
        url:`/org/list/${name}`
    })
}

//批量删除
export const dels = (ids)=>{
    return axios({
        method:"delete",
        url:`/org/batch/${ids}`,
        
    })
}

