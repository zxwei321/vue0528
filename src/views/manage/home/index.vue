<script setup>
</script>

<template>
  <div class="page">
    <el-row :gutter="20">
      <el-col :span="6"><div class="grid-content ep-bg-purple" /></el-col>
      <el-col :span="6"><div class="grid-content ep-bg-purple" /></el-col>
      <el-col :span="6"><div class="grid-content ep-bg-purple" /></el-col>
      <el-col :span="6"><div class="grid-content ep-bg-purple" /></el-col>
    </el-row>
    <el-row>
      <el-col :span="24">
        <!-- <el-button v-permission="'user'" >新增</el-button>
        <el-button v-permission="'add'">编辑</el-button>
        <el-button v-permission="'del'">删除</el-button>
        <el-button v-permission="'admin'">搜索</el-button> -->
      </el-col>
    </el-row>
  </div>
</template>

<style scoped>
.el-row {
  margin-bottom: 20px;
}
.el-row:last-child {
  margin-bottom: 0;
}
.el-col {
  border-radius: 4px;
}

.grid-content {
  border-radius: 4px;
  min-height: 36px;
  background: #d3dce6;
}
</style>
