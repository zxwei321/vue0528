import { createRouter, createWebHistory } from 'vue-router'
import { useUserStore } from '../stores/user'
import { getToken } from '../utils/token'
import login from '../views/login/index.vue'
const modules = import.meta.glob('../views/manage/**/*.vue')

const routes =[
  {
    path: '/',
    redirect:"/login"
  },
  {
    path: '/login',
    name: 'login',
    component: login
  },
  {
    path: '/404',
    name: 'notfound',
    meta:{title:"404"},
    component: () => import('../views/404/index.vue'),
  },
  {
    path: '/:pathMatch(.*)*',
    redirect: '/404'
  }
]


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

export const setRoutes = ()=>{
  const menuData = sessionStorage.getItem("menus")
  if(menuData){
    const menuRoute ={
      path: '/index',
      name: 'index',
      meta:{title:"主页"},
      component: () => import('../views/Index.vue'),
      children:[
        {
          path: '/index',
          component: () => import('../views/manage/home/index.vue'), 
          redirect:"/home"
        },{
          path: '/person',
          name: 'person',
          meta:{title:"个人中心"},
          component: () => import('../views/person/index.vue'),
        },{
          path: '/password',
          name: 'password',
          meta:{title:"密码修改"},
          component: () => import('../views/manage/system/repassword.vue')
        },{
          path: '/allocresource/:id',
          name: 'allocresource',
          meta:{title:"分配资源"},
          component: () => import('../views/manage/system/roleAllocResource.vue'),
          props:true
        }
      ]
    }
    const menus = JSON.parse(menuData)
    menus.forEach(item=>{
      let obj = {
        id:item.id,
        path: item.path,
        name: item.name,
        meta: {title:item.title},
        component: () => import("../views/manage/"+item.component+".vue"),
        children:item.children
      }

         menuRoute.children.push(obj)

      if(item.children){
          let arr = []
          obj.children.forEach((v)=>{
            arr.push({
              id:v.id,
              path: v.path,
              name: v.name,
              meta: {title:v.title},
              component: () => import("../views/manage"+v.component+".vue"),
              children:v.children
            })
         })
         obj.children = arr
      }
    })
    router.addRoute(menuRoute)
  }
}

setRoutes()
router.beforeEach(async(to, from, next) => {
  const menuData = getToken("token")
  if(to.path === "login"){
    next()
  }else{
    next()
  }
})



export default router

