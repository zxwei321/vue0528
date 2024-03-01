import {ref} from 'vue';
import {list} from '../api/resource';

const useResource = () => {
  //查询条件

  //查询结果
  const resourceData = ref ([]);
  //查询方法
  const load = async () => {
    const {data} = await list ();
    resourceData.value = data.data;
  };

  return { resourceData, load};
};

export default useResource;
