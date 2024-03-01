<script setup>
import { reactive, ref } from "vue";
import { add, update, list } from "../../../api/org";
const dialogFormVisible = ref(false);
const formLabelWidth = "140px";
const initForm = () => ({
  code: "000001",
  name: "",
  pid: "",
});

const form = reactive(initForm());

const dialogTitle = ref();

const emit = defineEmits(["on-submit"]);

const dialogShow = (row) => {
  if (row) {
    dialogTitle.value = "编辑";
  } else {
    dialogTitle.value = "新增";
  }
  dialogFormVisible.value = true;
};
//提交相关数据
const onSave = () => {
  dialogFormVisible.value = false;
};
defineExpose({
  dialogShow,
});
</script>

<template>
  <el-dialog v-model="dialogFormVisible" :title="dialogTitle + '信息'">
    <el-form :model="form">
      <el-form-item label="机构编码" :label-width="formLabelWidth">
        <el-input v-model="form.code" autocomplete="off" />
      </el-form-item>
      <el-form-item label="机构名称" :label-width="formLabelWidth">
        <el-input v-model="form.name" autocomplete="off" />
      </el-form-item>
      <el-form-item label="顶级机构" :label-width="formLabelWidth">
        <el-select v-model="form.region" placeholder="Please select a zone">
          <el-option label="Zone No.1" value="shanghai" />
          <el-option label="Zone No.2" value="beijing" />
        </el-select>
      </el-form-item>
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
