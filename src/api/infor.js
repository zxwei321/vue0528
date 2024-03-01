import axios from "../utils/reqest";

//增加
export const add = (data)=>{
    return axios({
        method:"post",
        url:"/information/add",
        data
    })
}

//删除
export const del = (id)=>{
    return axios({
        method:"delete",
        url:`/information/del/${id}`,
    })
}

//修改
export const update = (data)=>{
    return axios({
        method:"put",
        url:`/information/update/`,
        data
    })
}

//通过id 查询
export const findById = (id)=>{
    return axios({
        method:"get",
        url:`/information/findById/${id}`
    })
}

//获取分页列表
export const list = (pageNo,pageSize)=>{
    return axios({
        method:"get",
        url:`/information/list/${pageNo}/${pageSize}`
    })
}
//搜索条件
export const lists = (pageNo,pageSize,title)=>{
    return axios({
        method:"get",
        url:`/information/searchList/${pageNo}/${pageSize}/${title}`
    })
}



