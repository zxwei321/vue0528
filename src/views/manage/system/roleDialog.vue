<script setup>
import {reactive, ref} from 'vue';
import {ElMessage, ElMessageBox} from 'element-plus';
import { add ,update} from "../../../api/role";
import { useRole } from "../../../composables/useRole";

const dialogFormVisible = ref(false);
const formLabelWidth = "100px";
const initFormData = () => ({
  name: "",
  description: "",
  flag: "",
});
const form = reactive(initFormData());
const isCreate = ref(true);
const dialogTitle = ref();
const saveTitle = ref();

const fmRest = ref();
const dialogShow = (row) => {
  console.log(row, "addOredit");
  Object.assign(form, initFormData());
  if (row) {
    isCreate.value = false;
    dialogTitle.value = "编辑";
    saveTitle.value = "修改";
    Object.assign(form, { ...row });
  } else {
    isCreate.value = true;
    dialogTitle.value = "新增";
    saveTitle.value = "提交";
  }
  dialogFormVisible.value = true;
};

// 发射 通知 信息 ，发给父级
const emit = defineEmits(["handleSubmit"]);
const save = async () => {
  // fmRest.value.resetFields();
  if (isCreate.value) {
    await add(form);
    emit("handleSubmit");
    ElMessage({
      message: "添加成功",
      type: "success",
    });
  } else {
    await update(form);
    emit("handleSubmit");
    ElMessage({
      message: "修改成功",
      type: "success",
    });
  }

  dialogFormVisible.value = false;
};

defineExpose({
  dialogShow,
});
</script>

<template>
  <el-dialog v-model="dialogFormVisible" :title="dialogTitle">
    <el-form :model="form" ref="fmRest">
      <el-form-item label="名称" :label-width="formLabelWidth" prop="name">
        <el-input v-model="form.name" autocomplete="off" />
      </el-form-item>
      <el-form-item
        label="描述"
        :label-width="formLabelWidth"
        prop="description"
      >
        <el-input v-model="form.description" autocomplete="off" />
      </el-form-item>
      <el-form-item label="标记" :label-width="formLabelWidth" prop="flag">
        <el-input v-model="form.flag" autocomplete="off" />
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取消</el-button>
        <el-button type="primary" @click="save">
          {{ saveTitle }}信息
        </el-button>
      </span>
    </template>
  </el-dialog>
</template>

<style scoped>
</style>
