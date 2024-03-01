import axios from "../utils/reqest";

//增加
export const add = (data)=>{
    return axios({
        method:"post",
        url:"/role/add",
        data
    })
}

//删除
export const del = (id)=>{
    return axios({
        method:"delete",
        url:`/role/del/${id}`,
    })
}

//修改
export const update = (data)=>{
    return axios({
        method:"put",
        url:`/role/update/`,
        data
    })
}

//获取分页列表
export const list = (pageNo,pageSize)=>{
    return axios({
        method:"get",
        url:`/role/findByPage/${pageNo}/${pageSize}`
    })
}
//获取分页列表
export const lists = ()=>{
    return axios({
        method:"get",
        url:`/role/list`
    })
}



//获取对象
export const getInfo = (id)=>{
    return axios({
        method:"get",
        url:`/role/findOne/${id}`,
        data
    })
}
//查询
export const searchList = (pageNo,pageSize,name)=>{
    return axios({
        method:"get",
        url:`/role/findByPageParams/${pageNo}/${pageSize}/${name}`
    })
}
//批理删除
export const dels= (ids)=>{
    return axios({
        method:"delete",
        url:`/role/batch/${ids}`,
    })
}

//角色添加菜单
export const addRoleMenus = (id,data)=>{
    return axios({
        method:"post",
        url:`/role/roleMenu/${id}`,
        data
    })
}


//获取角色菜单
export const getRoleMenus = (id)=>{
    return axios({
        method:"get",
        url:`/role/findRoleMenu/${id}`,
    })
}


//角色添加资源
export const addRoleResource = (id,data)=>{
    return axios({
        method:"post",
        url:`/role/roleResource/${id}`,
        data
    })
}


//获取角色资源
export const getRoleResources = (id)=>{
    return axios({
        method:"get",
        url:`/role/findRoleResource/${id}`,
    })
}



