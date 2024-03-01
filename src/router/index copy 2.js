import { createRouter, createWebHistory } from 'vue-router'
import { useUserStore } from '../stores/user'
import login from '../views/login/index.vue'
import { list } from '../api/menu'
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
    path: '/index',
    name: 'index',
    meta:{title:"主页"},
    component: () => import('../views/Index.vue'),
  }
]


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})


router.beforeEach(async(to, from, next) => {
  //addRoutes()
  if(to.path === "login"){
    next()
  }else{
    next()
  }
  // next()
 
})

const addRoutes = async ()=>{
  const store = useUserStore()
  //获取数据
  // console.log(store.menuTree,'缓存数据');
  const resMenu = await list();
  let oneMenu = resMenu.data.data.filter((item) => item.level === 0);
  let twoMenu = resMenu.data.data.filter((item) => item.level === 1);
  oneMenu.forEach((item) => {
    item.children = twoMenu.filter((v) => v.pid === item.id);
  });
  console.log(oneMenu,'oneMenu');
   
  //缓存数据 --- >>>>>>
  store.menuTree = oneMenu;
  //store.menuTree = oneMenu;
  //拼接数据（路由）
  let nav = routesData(oneMenu)
  //动态添加
  router.addRoute("Index",nav)
 
}
//拼接数据（路由）
const routesData=(data) =>{
  //第一步：找到要插入的地方
  let indexRouter = routes.filter(v=>v.path == "/index")[0]
  //第二步：添加children
  indexRouter.children = [{
    path: '/index',
    component: () => import('../views/manage/home/index.vue'), 
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

  data.forEach((item)=>{
    //先循环第一层
    let obj={
      id:item.id,
      path: item.path,
      name: item.name,
      meta: {title:item.title},
      component: () => import("../views/manage/"+item.component+".vue"),
      children:item.children
    }
    indexRouter.children.push(obj)
     //判断第一层的有没有子级，有
    if(obj.children.length > 0){
      // 定义一个变化，存在这些子级
      let arr =[]
      obj.children.forEach((v)=>{
        arr.push({
          id:v.id,
          path: v.path,
          name: v.name,
          meta: {title:v.title},
          component: () => import("../views/manage"+v.component+".vue")
        })
    })
    obj.children = arr
    }
  })

  return indexRouter
  
}


export {router,addRoutes}

