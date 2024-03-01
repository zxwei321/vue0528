<script setup>
import { onMounted, ref } from "vue";
import { Search, Edit, Delete, EditPen } from "@element-plus/icons-vue";
import { ElMessage, ElMessageBox } from "element-plus";
import menuDialog from "./menuDialog.vue";
import { del, dels, searchName } from "../../../api/menu";
import useMenu from "../../../composables/useMenu";
const { menuData, load } = useMenu();

load();
const multiRows = ref();
const name = ref("");
// 弹框功能
const dialog = ref();
// 表格表头样式
const headerCellStyle = ref({
  background: "#EBEEF5 !important",
  "font-size": "16px",
});

//搜索功能
const search = async () => {
  const { data } = await searchName(name.value);
  menuData.value = data.data.data;
};
const reset = () => {
  name.value = "";
  load();
};

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
const tableColShow = ref(true)

</script>

<template>
  <div class="page">
    <el-card class="box-card">
      <template #header>
        <el-button type="primary" v-permission="['menus.add']" :icon="Edit" @click="dialog.dialogShow(0)"
          >新增</el-button
        >
        <el-button type="danger"  v-permission="['menus.dels']" :icon="Delete" @click="handleDelAll"
          >批量删除</el-button
        >
        <div class="fr">
          <el-form :inline="true"  v-permission="['menus.search']">
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
        :data="menuData"
        :header-cell-style="headerCellStyle"
        row-key="id"
        default-expand-all
        ref="multiRows"
      >
        <el-table-column type="selection" width="55" />
        <el-table-column type="index" label="序号" width="60" />
        <el-table-column
          prop="icons"
          label="菜单名称"
          width="200"
          align="center"
        >
          <template #default="scope">
            <el-icon><component :is="scope.row.icons"> </component></el-icon
            >{{ scope.row.name }}
          </template>
        </el-table-column>
        <el-table-column prop="title" label="菜单标题" />
        <el-table-column prop="path" label="菜单路径" />
        <el-table-column label="是否显示" align="center">
          <template #default="scope">
            {{ scope.row.shown ? "是" : "否" }}
          </template>
        </el-table-column>
        <el-table-column prop="component" label="菜单模板" width="200" />
        <el-table-column prop="icons" label="菜单图标" align="center">
          <template #default="scope">
            <el-icon size="20"
              ><component :is="scope.row.icons"> </component
            ></el-icon>
          </template>
        </el-table-column>
        <el-table-column prop="ordernumb" label="菜单排序" align="center" />
        <el-table-column label="操作" align="center" width="200" v-if="tableColShow">
          <template #default="scope">
            <el-button
              type=""
              size="small"
              :icon="EditPen"
              @click="dialog.dialogShow(scope.row)"
              v-permission="['menus.edit']"
              >编辑</el-button
            >
            <el-button
              type="danger"
              size="small"
              :icon="Delete"
              @click="handleDel(scope.row.id)"
              v-permission="['menus.del']"
              >删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>
      <menuDialog :tableData="menuData" @on-submit="load" ref="dialog" />
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
