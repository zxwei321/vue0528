<script setup>
import { reactive, ref } from "vue";
import { ElMessage } from "element-plus";

const dialogImgVisible = ref(false);

const uploadRef = ref();

const emit = defineEmits(["postImg"]);

const imgDialogShow = (row) => {
  dialogImgVisible.value = true;
};

const handleSuccess = (uploadFile) => {
  emit("postImg", uploadFile);
  uploadRef.value.clearFiles();
};
//提交相关数据
const submitUpload = () => {
  uploadRef.value.submit();
  ElMessage({
    showClose: true,
    message: "图片上传成功",
    type: "success",
  });
  dialogImgVisible.value = false;
};
defineExpose({
  imgDialogShow,
});
</script>

<template>
  <el-dialog v-model="dialogImgVisible" title="图片上传">
    <el-upload
      ref="uploadRef"
      class="upload-demo"
      action="http://localhost:8000/file/upload"
      :auto-upload="false"
      :on-success="handleSuccess"
    >
      <template #trigger>
        <el-button type="primary">选择图片</el-button>
      </template>
      <el-button class="ml10" type="success" @click="submitUpload">
        上传图片
      </el-button>
    </el-upload>
  </el-dialog>
</template>

<style scoped>
</style>
