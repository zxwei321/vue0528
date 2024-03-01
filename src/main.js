import {createApp} from 'vue';
import {createPinia} from 'pinia';
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate';
import ElementPlus from 'element-plus';
import * as ElementPlusIconsVue from '@element-plus/icons-vue';
import zhCn from 'element-plus/dist/locale/zh-cn.mjs';
import 'element-plus/dist/index.css';

import {permission} from './directives/permission';

import App from './App.vue';
import router from './router';

import './assets/main.css';

const app = createApp (App);

app.directive ('permission', permission);

for (const [key, component] of Object.entries (ElementPlusIconsVue)) {
  app.component (key, component);
}
app.use (ElementPlus, {
  locale: zhCn,
});
const pinia = createPinia ();
pinia.use (piniaPluginPersistedstate);

//动态路由页面刷新的问题，解决方案
// import { router,addRoutes } from './router'
// const boot = async()=>{
//   app.use(pinia)
//   await addRoutes()
//   app.use(router)
//   app.mount('#app')
// }
// boot()
app.use (pinia);
app.use (router);
app.mount ('#app');
