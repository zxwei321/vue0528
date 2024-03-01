<script setup>
import { onMounted, reactive, ref, watch } from "vue";
import { addRoleMenus, getRoleMenus } from "../../../api/role";
import useMenu from "../../../composables/useMenu";

const { menuData, load } = useMenu();

const dialogTreeVisible = ref(false);

load();
const defaultProps = {
  children: "children",
  label: "name",
  value: "id",
};

//默认被选择中的key
const checkedIds = ref([]);

//获取所有被选中的菜单id,之后，保存到被选中 key
const getCheckedIds = (arrData) => {
  arrData.forEach((item) => {
    if (item.subMenuList) {
      //是个数组
      getCheckedIds(item.subMenuList);
    } else if (item.selected) {
      checkedIds.value.push(item.id);
    }
  });
};
const roleId = ref();
const dialogTreeShow = (id) => {
  roleId.value = id;
  getRoleMenu(id);
  dialogTreeVisible.value = true;
};


defineExpose({
  dialogTreeShow,
});

const treeValus = ref();
const getRoleMenu = async (id) => {
  const { data } = await getRoleMenus(id);
  checkedIds.value = data.data;
};

const emit = defineEmits(["on-saveMenu"])
const save = async () => {
  let menuIds = treeValus.value.getCheckedKeys();
  const res = await addRoleMenus(roleId.value, menuIds);
  emit("on-saveMenu")
  dialogTreeVisible.value = false;
};
</script>

<template>
  <el-dialog v-model="dialogTreeVisible" title="分配菜单">
    <div>
      <el-tree
        ref="treeValus"
        :data="menuData"
        :props="defaultProps"
        show-checkbox
        default-expand-all
        node-key="id"
        :default-checked-keys="checkedIds"
      />
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
