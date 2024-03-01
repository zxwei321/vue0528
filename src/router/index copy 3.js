import { createRouter, createWebHistory } from 'vue-router'
import login from '../views/login/index.vue'
const modules = import.meta.glob('../views/manage/**/*.vue')
import navTest from '../utils/navData'


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
    path: '/index',
    name: 'index',
    meta:{title:"主页"},
    component: () => import('../views/Index.vue'),
  }
]
// 第一步：找到要插入的地方
let indexRouter = routes.filter(v=>v.path == "/index")[0]
//第二步：添加children
indexRouter.children = [{
  path: '/index',
  redirect:"/home"
},{
  path: '/person',
  name: 'person',
  meta:{title:"个人中心"},
  component: () => import('../views/person/index.vue'),
},{
  path: '/allocresource/:id',
  name: 'allocresource',
  meta:{title:"分配资源"},
  component: () => import('../views/manage/system/roleAllocResource.vue'),
  props:true
}];

//component: () => import(`../views/manage/${item.component}.vue`)
//component: modules['../views/manage/' + item.component + '.vue']

//第三步： 递归调用，传参数（公共数据，有子级路由数据）
const initRoutes=(data,subObj) =>{
  data.forEach(item => {
    let obj={
      id:item.id,
      path: item.path,
      name: item.name,
      meta: {title:item.title},
      component: modules['../views/manage/' + item.component + '.vue']
    }
    if(subObj instanceof Array){  //类型是不是数组
      subObj.push(obj)
    }else{
      if(!subObj.children){
        subObj.children=[]
      }
      subObj.children.push(obj)
    }
    //递归自调
    if(item.children){
      initRoutes(item.children,obj)
    }
  });
  
}

initRoutes(navTest,indexRouter.children)


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

export default router
