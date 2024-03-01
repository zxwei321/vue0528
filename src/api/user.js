import axios from '../utils/reqest';

export const login = (username,password) => {
    return axios({
        method:"get",
        url:`user/login/${username}/${password}`
    })
};


//新增
export const add = (data)=>{
    return axios({
        method:"post",
        url:"/user/add",
        data
    })
}
//删除
export const del = (id)=>{
    return axios({
        method:"delete",
        url:`/user/del/${id}`,
        
    })
}
//修改
export const update = (data)=>{
    return axios({
        method:"put",
        url:`/user/update`,
        data
        
    })
}
//获列更新对象
export const getOne = (id)=>{
    return axios({
        method:"get",
        url:`/user/find/${id}`,
        
    })
}
//获取列表
export const list = (pageNo,pageSize)=>{
    return axios({
        method:"get",
        url:`/user/list/${pageNo}/${pageSize}`
    })
}
//搜索

export const listParams = (pageNo,pageSize,name)=>{
    return axios({
        method:"get",
        url:`/user/listParams/${pageNo}/${pageSize}/${name}`
    })
}

//批量删除
export const dels = (ids)=>{
    return axios({
        method:"delete",
        url:`/user/batch/${ids}`,
        
    })
}

