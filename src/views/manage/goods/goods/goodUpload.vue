<script setup>
import { reactive, ref } from "vue";
import { ElMessage } from 'element-plus'
// 弹框相关信息
const dialogImageVisible = ref(false);
const imgShow = () => {
  dialogImageVisible.value = true;
};

// 图片相关信息
const uploadRef = ref();
const emit = defineEmits(["postImg"])
const handleSuccess = (uploadFile) => {
  emit("postImg",uploadFile)
  uploadRef.value.clearFiles();
};
const fileList = ref([])
const submitUpload = () => {
  uploadRef.value.submit();
   ElMessage({
    showClose: true,
    message: '图片上传成功',
    type: 'success',
  })
   dialogImageVisible.value = false;
};

// 对外暴露内容
defineExpose({
  imgShow,
});
</script>

<template>
  <el-dialog v-model="dialogImageVisible" title="图片上传">
    <el-upload
      ref="uploadRef"
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
