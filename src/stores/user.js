import {defineStore} from 'pinia';

export const useUserStore = defineStore ('user', {
  state: () => {
    return {
      count: 0,
      username: '',
      menus: [],
      menuTree: [],
      info: {},
      avatarImg: '',
      nickname: '',
      tabList: [
        {
          title: '首页',
          name: '首页',
          path: '/home',
        },
      ],
      // roles:['user'], // 测试按钮权限
    };
  },
  actions: {
    increment () {
      this.count++;
    },
    addTabs (data) {
      this.tabList.push (data);
    },
    delTab (index) {
      this.tabList.splice (index, 1);
    },
    setAvatar (img) {
      this.info.avatar = img;
    },
    logout () {
      this.tabList = [
        {
          title: '首页',
          name: '首页',
          path: '/home',
        },
      ]
      this.menus=[]
    },
  },
  persist: true,
});
