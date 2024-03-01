<script setup>
import { onMounted, ref, watch, reactive } from "vue";
import { useRouter } from "vue-router";
import { Edit, Delete, Search } from "@element-plus/icons-vue";
import { useRole } from "../../../composables/useRole";
import roleDialog from "./roleDialog.vue";
import roleAllocateDialog from "./roleAllocateDialog.vue";
import roleAllocResourceDialog from './roleAllocResourceDialog.vue'

const router = useRouter();

const {
  tableData,
  totalNum,
  pageNo,
  pageSize,
  multiRows,
  dialog,
  load,
  handleCurrentChange,
  handleSizeChange,
  handleDelete,
  handleDelAll,
} = useRole();
load();
//搜索
const name = ref("");
const search = () => {};
const reset = () => {};

const allocateDialog = ref();
const allocresource = (id) => {
  router.push({ name: "allocresource", params: { id } });
};
const rerourceDialog = ref()
</script>

<template>
  <div class="page">
    <el-card class="box-card">
      <template #header>
        <el-button @click="dialog.dialogShow(0)" type="primary" :icon="Edit"
          >新增</el-button
        >
        <el-button @click="handleDelAll" type="danger" :icon="Delete"
          >批量删除</el-button
        >
        <div class="fr">
          <el-form :inline="true">
            <el-form-item>
              <el-input v-model="name" placeholder="请输入搜索内容" />
            </el-form-item>
            <span
              ><el-button type="primary" :icon="Search" @click="search"
                >搜索</el-button
              ></span
            >
            <span class="ml10"
              ><el-button type="info" @click="reset">重置</el-button></span
            >
          </el-form>
        </div>
      </template>
      <el-table
        :data="tableData"
        :header-cell-style="{
          background: '#EBEEF5 !important',
          'font-size': '16px',
        }"
        style="width: 100%"
        ref="multiRows"
      >
        <el-table-column type="selection" width="55" />
        <el-table-column type="index" label="序号" width="100" />
        <el-table-column prop="name" label="角色名称" />
        <el-table-column prop="description" label="角色描述" />
        <el-table-column prop="flag" label="角色标记" />

        <el-table-column label="操作" width="300" align="center">
          <template #default="scope">
            <el-button
              size="small"
              @click="allocateDialog.dialogTreeShow(scope.row.id)"
              >分配菜单</el-button
            >
            <!-- <el-button size="small" @click="allocresource(scope.row.id)"
              >分配资源</el-button
            > -->
             <el-button size="small" @click="rerourceDialog.ResourceDialogShow(scope.row)"
              >分配资源</el-button
            >

            <el-button size="small" @click="dialog.dialogShow(scope.row)"
              >编辑</el-button
            >
            <el-button
              size="small"
              type="danger"
              @click="handleDelete(scope.row.id)"
              >删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>
      <div class="mt10">
        <el-pagination
          v-model:current-page="pageNo"
          v-model:page-size="pageSize"
          :page-sizes="[2, 4, 6, 8]"
          layout="total, sizes, prev, pager, next, jumper"
          :total="totalNum"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
        />
      </div>
      <roleDialog ref="dialog" @handleSubmit="load" />
      <roleAllocateDialog ref="allocateDialog" @on-saveMenu="load" />
      <roleAllocResourceDialog ref="rerourceDialog" @on-submit="load"  />
    </el-card>
  </div>
</template>

<style scoped>
.box-card {
  width: auto;
}
.el-form--inline .el-form-item {
  vertical-align: inherit;
  margin-right: 10px !important;
}
.el-icon {
  margin-right: 5px;
}
</style>
