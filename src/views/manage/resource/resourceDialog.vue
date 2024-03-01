<script setup>
import { reactive, ref } from "vue";
import { ElMessage, ElMessageBox } from "element-plus";
import { add, update, list } from "../../../api/resource";
import useResource from "../../../composables/useResource";
const { load, resourceData } = useResource();
const dialogFormVisible = ref(false);
const formLabelWidth = "100px";
const initForm = () => ({
  resourceName: "",
  resourceNickname: "",
  resourceDescription: "",
  pid: "",
});

const form = reactive(initForm());

const dialogTitle = ref();
const createrResource = ref(false);
const emit = defineEmits(["on-submit"]);

const dialogShow = (row) => {
  Object.assign(form, initForm());
  if (row) {
    Object.assign(form, {...row});
    dialogTitle.value = "编辑";
    createrResource.value = false;
  } else {
    dialogTitle.value = "新增";
    createrResource.value = true;
  }
  load();
  dialogFormVisible.value = true;
};
//提交相关数据
const onSave = async () => {
  if (createrResource.value) {
    await add(form);
    ElMessage({
      showClose: true,
      message: "添加成功",
      type: "success",
    });
  } else {
    await update(form);
    ElMessage({
      showClose: true,
      message: "编辑成功",
      type: "success",
    });
  }

  emit("on-submit");
  dialogFormVisible.value = false;
};
defineExpose({
  dialogShow,
});
</script>

<template>
  <el-dialog v-model="dialogFormVisible" :title="dialogTitle + '信息'">
    <el-form :model="form">
      <el-row>
        <el-col :span="12">
          <el-form-item label="资源名称" :label-width="formLabelWidth">
            <el-input
              v-model="form.resourceName"
              autocomplete="off"
            /> </el-form-item
        ></el-col>
        <el-col :span="12">
          <el-form-item label="资源别名" :label-width="formLabelWidth">
            <el-input
              v-model="form.resourceNickname"
              autocomplete="off"
            /> </el-form-item
        ></el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="资源描述" :label-width="formLabelWidth">
            <el-input
              v-model="form.resourceDescription"
              autocomplete="off"
            /> </el-form-item
        ></el-col>
        <el-col :span="12">
          <el-form-item label="资源类型" :label-width="formLabelWidth">
            <el-select v-model="form.pid" placeholder="请选择资源名称">
              <el-option
                v-for="item in resourceData"
                :key="item.id"
                :label="item.resourceName"
                :value="item.id"
              />
            </el-select> </el-form-item
        ></el-col>
      </el-row>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取消</el-button>
        <el-button type="primary" @click="onSave"> 提交 </el-button>
      </span>
    </template>
  </el-dialog>
</template>

<style scoped>
</style>
