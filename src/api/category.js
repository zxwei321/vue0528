import axios from '../utils/reqest';


//新增
export const add = (data)=>{
    return axios({
        method:"post",
        url:"/category/add",
        data
    })
}
//删除
export const del = (id)=>{
    return axios({
        method:"delete",
        url:`/category/del/${id}`,
        
    })
}
//修改
export const update = (data)=>{
    return axios({
        method:"put",
        url:`/category/update`,
        data
        
    })
}
//获列更新对象
export const findId = (id)=>{
    return axios({
        method:"get",
        url:`/category/findById/${id}`,
        
    })
}
//获取列表
export const list = (pageNo,pageSize)=>{
    return axios({
        method:"get",
        url:`/category/findByPage/${pageNo}/${pageSize}`
    })
}
//搜索

export const searchParams = (pageNo,pageSize,title)=>{
    return axios({
        method:"get",
        url:`/category/findByPageParams/${pageNo}/${pageSize}/${title}`
    })
}

//批量删除
export const dels = (ids)=>{
    return axios({
        method:"delete",
        url:`/category/batch/${ids}`,
        
    })
}

