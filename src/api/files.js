import axios from '../utils/reqest';


//获取列表
export const list = ()=>{
    return axios({
        method:"get",
        url:`/file/list`
    })
}
//获取列表
export const listPage = (pageNo,pageSize)=>{
    return axios({
        method:"get",
        url:`/file/listPage/${pageNo}/${pageSize}`
    })
}
//新增
export const add = (data)=>{
    return axios({
        method:"post",
        url:"/file/save",
        data
    })
}
//删除
export const del = (id)=>{
    return axios({
        method:"delete",
        url:`/file/del/${id}`,
        
    })
}
//修改
export const update = (data)=>{
    return axios({
        method:"put",
        url:`/file/update`,
        data
        
    })
}
//获列更新对象
export const getOne = (id)=>{
    return axios({
        method:"get",
        url:`/file/find/${id}`,
        
    })
}

//批量删除
export const dels = (ids)=>{
    return axios({
        method:"delete",
        url:`/file/batch/${ids}`,
        
    })
}
//搜

