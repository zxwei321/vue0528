//所有的业务逻辑在里写
import {nextTick, reactive, ref, defineEmits} from 'vue';
import {ElMessage, ElMessageBox} from 'element-plus';
import {add, del, dels, update, list, searchList, getInfo} from '../api/role';

export const useRole = () => {
  //列表  ----初始化 数据
  // 属性
  const pageNo = ref (1);
  const pageSize = ref (4);
  const totalNum = ref (0);
  const tableData = ref ();
  const multiRows = ref ();
  //新增
  const dialog = ref ();
  
  //方法
  const load = async () => {
    const {data} = await list (pageNo.value, pageSize.value);
    if (data.code === '200') {
      tableData.value = data.data.data;
      totalNum.value = data.data.total;
    } else {
      ElMessage ({
        message: '请求失败',
        type: 'warning',
      });
    }
  };
  //分页操作
  const handleCurrentChange = val => {
    pageNo.value = val;
    load ();
  };
  const handleSizeChange = val => {
    pageSize.value = val;
    load ();
  };
  //删除
  const handleDelete = id => {
    ElMessageBox.confirm ('你确定要批量删除数据吗？', {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning',
    })
      .then (async () => {
        await del (id);
        load ();
        ElMessage ({
          type: 'success',
          message: '删除完成',
        });
      })
      .catch (() => {
        ElMessage ({
          type: 'info',
          message: '删除失败',
        });
      });
  };
  //批量删除
  const handleDelAll = () => {
    let rows = multiRows.value;
    let rowsData = rows.getSelectionRows ();
    ElMessageBox.confirm ('你确定要批量删除数据吗？', {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning',
    })
      .then (async () => {
        let ids = rowsData.map (item => item.id);
        await dels (ids);
        load ();
        ElMessage ({
          type: 'success',
          message: '删除完成',
        });
      })
      .catch (() => {
        ElMessage ({
          type: 'info',
          message: '删除失败',
        });
      });
  };

  return {
    tableData,
    totalNum,
    pageNo,
    pageSize,
    multiRows,
    dialog,
    load,
    handleCurrentChange,
    handleSizeChange,
    handleDelete,
    handleDelAll,
  };
};
