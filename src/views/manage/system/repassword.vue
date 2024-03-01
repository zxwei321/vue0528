<script setup>
import { reactive } from 'vue'

const form = reactive({
 oldPassword:"",
 newPassword:""
})

</script>

<template>
  <div class="page">
    <el-card class="box-card">
      <template #header>
        <div class="card-header">
          <span>密码修改</span>
        </div>
      </template>
      <el-form :model="form">
        <el-form-item label="老密码">
          <el-input v-model="form.oldPassword" />
        </el-form-item>
        <el-form-item label="新密码">
          <el-input v-model="form.newPassword" />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">提交</el-button>
          <el-button>取消</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<style scoped>
.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.text {
  font-size: 14px;
}

.item {
  margin-bottom: 18px;
}

.box-card {
  width:400px;
}
</style>
