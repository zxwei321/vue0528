<script setup>
import { reactive, ref } from "vue";
import { add, update } from "../../../../api/category";
import { ElMessage } from "element-plus";
import imgDialog from "./imgDialog.vue";
const dialogFormVisible = ref(false);
const formLabelWidth = "140px";
const initForm = () => ({
  title: "",
  image: "",
  isEnable: true,
});

const form = reactive(initForm());
const dialogTitle = ref();
const imgCagegroryShow = ref();
const emit = defineEmits(["on-submit"]);

const createAdd = ref(false);
const dialogShow = (row) => {
  Object.assign(form, initForm());
  if (row) {
    dialogTitle.value = "编辑";
    Object.assign(form, { ...row });
    createAdd.value = false;
  } else {
    dialogTitle.value = "新增";
    createAdd.value = true;
  }
  dialogFormVisible.value = true;
};
//提交相关数据
const onSave = async () => {
  if (createAdd.value) {
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
      message: "修改成功",
      type: "success",
    });
  }
  emit('on-submit')
  dialogFormVisible.value = false;
};

//上传图片

const defaultImg = ref(
  "https://cube.elemecdn.com/e/fd/0fc7d20532fdaf769a25683617711png.png"
);

const postImg = (url) => {
  form.image = url;
};

defineExpose({
  dialogShow,
});
</script>

<template>
  <el-dialog v-model="dialogFormVisible" :title="dialogTitle + '信息'">
    <el-form :model="form">
      <el-form-item label="类别名称" :label-width="formLabelWidth">
        <el-input v-model="form.title" autocomplete="off" />
      </el-form-item>
      <el-form-item label="类别图片" :label-width="formLabelWidth">
        <el-image
          style="width: 100px; height: 100px"
          :src="form.image || defaultImg"
        />
        <el-button class="ml10" type="primary" @click="imgCagegroryShow.imgCagegoryDialogShow()"
          >上传图片</el-button
        >
      </el-form-item>
      <el-form-item label="是否显示" :label-width="formLabelWidth">
        <el-select v-model="form.isEnable" placeholder="请选择是否显示">
          <el-option label="是" :value="true" />
          <el-option label="否" :value="false" />
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
  <imgDialog ref="imgCagegroryShow" @postImg="postImg" />
</template>

<style scoped>
</style>
