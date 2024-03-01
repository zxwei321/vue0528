import axios from '../utils/reqest';
//新增
export const add = (data)=>{
    return axios({
        method:"post",
        url:"/goods/add",
        data
    })
}
//删除
export const del = (id)=>{
    return axios({
        method:"delete",
        url:`/goods/del/${id}`,
        
    })
}
//修改
export const update = (data)=>{
    return axios({
        method:"put",
        url:`/goods/update`,
        data
        
    })
}
//获列更新对象
export const find = (id)=>{
    return axios({
        method:"get",
        url:`/goods/findById/${id}`,
        
    })
}
//获取分页列表
export const list = (pageNo,pageSize)=>{
    return axios({
        method:"get",
        url:`/goods/findByPage/${pageNo}/${pageSize}`
    })
}
//按照商品名称搜索
export const searchParams = (pageNo,pageSize,title)=>{
    return axios({
        method:"get",
        url:`/goods/findByPageParams/${pageNo}/${pageSize}/${title}`
    })
}

//批量删除
export const dels = (ids)=>{
    return axios({
        method:"delete",
        url:`/goods/batch/${ids}`,
        
    })
}

