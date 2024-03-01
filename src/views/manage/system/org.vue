<script setup>
import { onMounted, ref } from "vue";
import { Search, Edit, Delete, EditPen } from "@element-plus/icons-vue";
import { ElMessage, ElMessageBox } from "element-plus";
import orgDialog from "./orgDialog.vue";
import { add, del, dels, list, find, searchParams } from "../../../api/org";
const tableData = ref();

const currentPage = ref(1);
const pageSize = ref(5);
const totalNum = ref(0);
const multiRows = ref();
const name = ref("");
const dialog = ref();
// 表格表头样式
const headerCellStyle = ref({
  background: "#EBEEF5 !important",
  "font-size": "16px",
});

//搜索功能
const search = () => {};
const reset = () => {};
//删除功能
const handleDelAll = () => {
  ElMessageBox.confirm("确定要批量删除此内容", "提示", {
    confirmButtonText: "确定",
    cancelButtonText: "取消",
    type: "提示",
  })
    .then(async () => {
      let ids = multiRows.value.getSelectionRows().map((item) => item.id);
      await dels(ids);
      load();
      ElMessage({
        type: "success",
        message: "删除成功",
      });
    })
    .catch(() => {
      ElMessage({
        type: "info",
        message: "删除取消",
      });
    });
};
const handleDel = (id) => {
  ElMessageBox.confirm("确定要删除此内容", "提示", {
    confirmButtonText: "确定",
    cancelButtonText: "取消",
    type: "提示",
  })
    .then(async () => {
      await del(id);
      load();
      ElMessage({
        type: "success",
        message: "删除成功",
      });
    })
    .catch(() => {
      ElMessage({
        type: "info",
        message: "删除取消",
      });
    });
};

//数据初始化
const load = async () => {
  const { data } = await list();
  if (data.code === "200") {
    tableData.value = data.data.data;
    totalNum.value = data.data.total;
  }
};

onMounted(() => {
  load();
});
//分页功能
const handleSizeChange = (val) => {
  load();
};
const handleCurrentChange = (val) => {
  load();
};
</script>

<template>
  <div class="page">
    <el-card class="box-card">
      <template #header>
        <el-button type="primary" :icon="Edit" @click="dialog.dialogShow(0)"
          >新增</el-button
        >
        <el-button type="danger" :icon="Delete" @click="handleDelAll"
          >批量删除</el-button
        >
        <div style="float: right">
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
              ><el-button type="" @click="reset">重置</el-button></span
            >
          </el-form>
        </div>
      </template>
      <el-table
        :data="tableData"
        :header-cell-style="headerCellStyle"
        row-key="id"
        ref="multiRows"
      >
        <el-table-column type="selection" width="55" />
        <el-table-column type="index" label="序号" width="100" />
        <el-table-column prop="code" label="机构编码" />
        <el-table-column prop="name" label="机构名称" />
        <el-table-column label="操作" align="center">
          <template #default="scope">
            <el-button
              type=""
              size="small"
              :icon="EditPen"
              @click="dialog.dialogShow(scope.row)"
              >编辑</el-button
            >
            <el-button
              type="danger"
              size="small"
              :icon="Delete"
              @click="handleDel(scope.row.id)"
              >删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        v-model:current-page="currentPage"
        v-model:page-size="pageSize"
        :page-sizes="[5, 10, 20, 30]"
        layout="total, sizes, prev, pager, next, jumper"
        :total="totalNum"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        class="mt10"
      />
      <orgDialog ref="dialog" :tableData="tableData" @on-submit="load" />
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
</style>
