<script setup>
import { onMounted, ref, watch, reactive, nextTick } from "vue";
import { Edit, Delete, Search } from "@element-plus/icons-vue";
import { ElMessage, ElMessageBox } from "element-plus";
import { del, dels, list, listParams } from "../../../api/user";
import userDialog from "./userDialog.vue";
//搜索
const name = ref("");
const search = async () => {
  if (name.value != "") {
    const res = await listParams(pageNo.value, pageSize.value, name.value);
    const { total, data } = res.data.data;
    totalNum.value = total;
    tableData.value = data;
  } else {
    ElMessage({
      showClose: true,
      message: "请输入要查询的条件",
      type: "warning",
    });
  }
};
const reset = () => {
  name.value = "";
  load();
};

//添加
const handleAdd = () => {
  dialogFormVisible.value = true;
  Object.assign(form, initFormData());
};

//批量删除
const multiRows = ref();
const handleDelAll = () => {
  let rows = multiRows.value;
  let rowsData = rows.getSelectionRows();
  ElMessageBox.confirm("你确定要批量删除数据吗？", {
    confirmButtonText: "确定",
    cancelButtonText: "取消",
    type: "warning",
  })
    .then(async () => {
      let ids = rowsData.map((item) => item.id);
      await dels(ids);
      load();
      ElMessage({
        type: "success",
        message: "删除完成",
      });
    })
    .catch(() => {
      ElMessage({
        type: "info",
        message: "删除失败",
      });
    });
};

//表格数据及操作
const handleEdit = (row) => {
  dialogFormVisible.value = true;
  Object.assign(form, { ...row });
};
const handleDelete = (id) => {
  ElMessageBox.confirm("你确定要批量删除数据吗？", {
    confirmButtonText: "确定",
    cancelButtonText: "取消",
    type: "warning",
  })
    .then(async () => {
      await del(id);
      load();
      ElMessage({
        type: "success",
        message: "删除完成",
      });
    })
    .catch(() => {
      ElMessage({
        type: "info",
        message: "删除失败",
      });
    });
};
const tableData = ref([]);
//分页
const pageNo = ref(1);
const pageSize = ref(6);
const totalNum = ref(0);
const handleCurrentChange = (val) => {
  pageNo.value = val;
  load();
};
const handleSizeChange = (val) => {
  pageSize.value = val;
  load();
};
const load = async () => {
  const res = await list(pageNo.value, pageSize.value);
  const { total, data } = res.data.data;
  totalNum.value = total;
  tableData.value = data;
};
onMounted(() => {
  load();
});
//弹框
const userDialogMian = ref();

const squareUrl =
  "https://cube.elemecdn.com/9/c2/f0ee8a3c7c9638a54940382568c9dpng.png";
</script>

<template>
  <div class="page">
    <el-card class="box-card">
      <template #header>
        <el-button
          v-permission="['user.add']"
          @click="userDialogMian.dialogShow(0)"
          type="primary"
          :icon="Edit"
          >新增</el-button
        >
        <el-button
          v-permission="['user.dels']"
          @click="handleDelAll"
          type="danger"
          :icon="Delete"
          >批量删除</el-button
        >
        <div class="fr">
          <el-form :inline="true" v-permission="['user.search']">
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
        <el-table-column label="id">
          <template #default="scope">
            {{ scope.row.id }}
          </template>
        </el-table-column>
        <el-table-column label="用户名">
          <template #default="scope">
            {{ scope.row.username }}
          </template>
        </el-table-column>
        <el-table-column label="密码">
          <template #default="scope">
            {{ scope.row.password }}
          </template>
        </el-table-column>
        <el-table-column label="昵称">
          <template #default="scope">
            {{ scope.row.nickname }}
          </template>
        </el-table-column>
        <el-table-column label="电话">
          <template #default="scope">
            {{ scope.row.phone }}
          </template>
        </el-table-column>
        <el-table-column label="角色">
          <template #default="scope">
            {{ scope.row.role }}
          </template>
        </el-table-column>
        <el-table-column label="头像">
          <template #default="scope">
            <el-image
              style="width: 60px; height: 50px"
              :src="scope.row.avatar || squareUrl"
            />
          </template>
        </el-table-column>
        <el-table-column label="操作" align="center">
          <template #default="scope">
            <el-button
              size="small"
              v-permission="['user.edit']"
              @click="userDialogMian.dialogShow(scope.row)"
              >编辑</el-button
            >
            <el-button
              size="small"
              type="danger"
              v-permission="['user.del']"
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
          :page-sizes="[2, 4, 6]"
          layout="total, sizes, prev, pager, next, jumper"
          :total="totalNum"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
        />
      </div>
    </el-card>
    <userDialog ref="userDialogMian" @on-submit="load" />
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
