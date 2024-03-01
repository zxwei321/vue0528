import axios from '../utils/reqest';


//新增
export const add = (data)=>{
    return axios({
        method:"post",
        url:"/resource/add",
        data
    })
}
//删除
export const del = (id)=>{
    return axios({
        method:"delete",
        url:`/resource/del/${id}`,
        
    })
}
//修改
export const update = (data)=>{
    return axios({
        method:"put",
        url:`/resource/update`,
        data
        
    })
}
//获列更新对象
export const findById = (id)=>{
    return axios({
        method:"get",
        url:`/resource/findById/${id}`,
        
    })
}
//获取列表
export const list = ()=>{
    return axios({
        method:"get",
        url:`/resource/list`
    })
}
//获取所有的资源Id
export const findIds = ()=>{
    return axios({
        method:"get",
        url:`/resource/findIds`
    })
}
//获取分页
export const findByPage = (pageNo,pageSize)=>{
    return axios({
        method:"get",
        url:`/resource/findByPage/${pageNo}/${pageSize}`
    })
}
//搜索

export const searchParams = (pageNo,pageSize,name)=>{
    return axios({
        method:"get",
        url:`/resource/findByPageParams/${pageNo}/${pageSize}/${name}`
    })
}

//批量删除
export const dels = (ids)=>{
    return axios({
        method:"delete",
        url:`/resource/batch/${ids}`,
        
    })
}

