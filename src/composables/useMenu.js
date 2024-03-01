import {ref} from 'vue';
import {lists} from '../api/menu';

const useMenu = () => {
  //查询条件

  //查询结果
  const menuData = ref ([]);
  //查询方法
  const load = async () => {
    const {data} = await lists ();
    menuData.value = data.data;
  };

  return {menuData, load};
};

export default useMenu;
