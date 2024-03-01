<script setup>
import { onMounted, reactive, ref, watch } from "vue";
import { ElMessage } from "element-plus";
import { useRouter } from "vue-router";
import { addRoleMenus, getRoleMenus } from "../../../api/role";
import useMenu from "../../../composables/useMenu";

import { useUserStore } from "../../../stores/user";

const { menuData, load } = useMenu();

const router = useRouter();
const store = useUserStore();

const dialogTreeVisible = ref(false);

load();
const defaultProps = {
  children: "children",
  label: "name",
  value: "id",
};
const roleId = ref();
//默认被选择中的key
const checkedIds = ref([]);
//选择中的id
const treeValus = ref([]);
const dialogTreeShow = (id) => {
  //先清空已经选择的Keys
  if (treeValus.value.length != 0) {
    treeValus.value.setCheckedKeys([], false);
  }
  roleId.value = id;
  getRoleMenu(id);
  dialogTreeVisible.value = true;
};

const getRoleMenu = async (id) => {
  const { data } = await getRoleMenus(id);
  checkedIds.value = data.data;
};

const emit = defineEmits(["on-saveMenu"]);
const save = async () => {
  let menuIds = treeValus.value.getCheckedKeys();
  const res = await addRoleMenus(roleId.value, menuIds);
  emit("on-saveMenu");
  dialogTreeVisible.value = false;
   ElMessage({
    message: '分配菜单成功',
    type: 'success',
  })
};
const selectCheck = ref(true)

defineExpose({
  dialogTreeShow,
});
</script>

<template>
  <el-dialog v-model="dialogTreeVisible" title="分配菜单" width="30%">
    <div>
      <el-tree
        ref="treeValus"
        :data="menuData"
        :props="defaultProps"
        show-checkbox
        default-expand-all
        node-key="id"
        :default-checked-keys="checkedIds"
        :check-strictly="selectCheck"
      >
        <template #default="{ node, data }">
          <span class="custom-tree-node">
            <span>
              <el-icon size="14"
                ><component :is="data.icons"></component
              ></el-icon>
            </span>
            <span class="ml5">{{ node.label }}</span>
          </span>
        </template></el-tree
      >
    </div>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogTreeVisible = false">取消</el-button>
        <el-button type="primary" @click="save"> 提交 </el-button>
      </span>
    </template>
  </el-dialog>
</template>

<style scoped>
</style>
