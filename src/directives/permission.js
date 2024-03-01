export const permission = {
  // mounted是指令的一个生命周期
  mounted (el, binding) {
    // value 获取用户使用自定义指令绑定的内容
    const {value} = binding;
    // 获取用户所有的权限按钮
    let premissionList = [];
    const permissionBtn = JSON.parse (sessionStorage.getItem ('permission'));
    permissionBtn.forEach (item => {
      for (let i = 0; i < item.children.length; i++) {
        premissionList.push (
          item.resourceNickname + '.' + item.children[i].resourceNickname
        );
      }
    });
    // 判断用户使用自定义指令，是否使用正确了
    if (value && value instanceof Array && value.length > 0) {
      const permissionFunc = value;
      //判断传递进来的按钮权限，用户是否拥有
      const hasPermission = premissionList.some (item => {
        return permissionFunc.includes (item);
      });
      //当用户没有这个按钮权限时，设置删除这个按钮
      if (!hasPermission) {
        // el.style.display = 'none';
        el.parentNode.removeChild (el);
      }
    } else {
      throw new Error ("need roles! Like v-permission=\"['admin','editor']\"");
    }
  },
};
