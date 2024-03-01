<script setup>
import { nextTick, reactive, ref } from "vue";
import { ElMessage } from "element-plus";
import { list, findIds } from "../../../api/resource";
import { addRoleResource, getRoleResources } from "../../../api/role";
const dialogFormVisible = ref(false);

const createAdd = ref(false);
const emit = defineEmits(["on-submit"]);
const roleId = ref();
const ResourceDialogShow = (row) => {
  checkedIds.value = [];
  console.log(row.id, "row");
  roleId.value = row.id;
  resourceList();
  resourceCheckedlist();
  if (row) {
    createAdd.value = false;
  } else {
    createAdd.value = true;
  }
  dialogFormVisible.value = true;
};

defineExpose({
  ResourceDialogShow,
});

const treeRef = ref();
const data = ref([]);
const checkedIds = ref([]);
const resourceIds = ref([]);
//资源列表
const resourceList = async () => {
  const res = await list();
  const ids = await findIds();
  data.value = res.data.data;
  ids.data.data.forEach((id) => {
    if (!checkedIds.value.includes(id)) {
      nextTick(() => {
        treeRef.value.setChecked(id, false);
      });
    }
  });
};

//已选择中的资源列表
const resourceCheckedlist = async () => {
  const res = await getRoleResources(roleId.value);
  console.log(res, "get");
  checkedIds.value = res.data.data;
};

const defaultProps = {
  children: "children",
  label: "resourceName",
  value: "id",
};

//提交相关数据
const onSave = async () => {
  let resourceIds = treeRef.value.getCheckedKeys();
  await addRoleResource(roleId.value, resourceIds);
  ElMessage({
    message: "分配资源成功",
    type: "success",
  });

  dialogFormVisible.value = false;
  emit("on-submit");
};
</script>

<template>
  <el-dialog v-model="dialogFormVisible" title="分配资源" width="30%">
    <el-tree
      ref="treeRef"
      :data="data"
      show-checkbox
      :props="defaultProps"
      default-expand-all
      node-key="id"
      :default-checked-keys="checkedIds"
    />
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取消</el-button>
        <el-button type="primary" @click="onSave">确定 </el-button>
      </span>
    </template>
  </el-dialog>
</template>

<style scoped>
</style>
