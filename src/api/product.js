import axios from '../utils/reqest';


//新增
export const add = (data)=>{
    return axios({
        method:"post",
        url:"/product/add",
        data
    })
}
//删除
export const del = (id)=>{
    return axios({
        method:"delete",
        url:`/product/del/${id}`,
        
    })
}
//修改
export const update = (data)=>{
    return axios({
        method:"put",
        url:`/product/update`,
        data
        
    })
}
//获列更新对象
export const getOne = (id)=>{
    return axios({
        method:"get",
        url:`/product/find/${id}`,
        
    })
}
//获取列表
export const list = (pageNo,pageSize)=>{
    return axios({
        method:"get",
        url:`/product/list/${pageNo}/${pageSize}`
    })
}
//搜索

export const listParams = (pageNo,pageSize,name)=>{
    return axios({
        method:"get",
        url:`/product/listParams/${pageNo}/${pageSize}/${name}`
    })
}

//批量删除
export const dels = (ids)=>{
    return axios({
        method:"delete",
        url:`/product/batch/${ids}`,
        
    })
}

