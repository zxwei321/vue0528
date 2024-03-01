<script setup>
import { onMounted, ref, watch, reactive } from "vue";
import { Upload, Delete,Search } from "@element-plus/icons-vue";
import { ElMessage, ElMessageBox } from "element-plus";
import { add, del, update, list, listPage, dels } from "../../../api/files";
//搜索
const name = ref("");
const search = () => {};
const reset = () => {};

//添加
const handleAdd = () => {
  dialogFormVisible.value = true;
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
const handleEdit = (row) => {};
const handleDelete = (row) => {
  ElMessageBox.confirm("你确定要批量删除数据吗？", {
    confirmButtonText: "确定",
    cancelButtonText: "取消",
    type: "warning",
  })
    .then(async () => {
      const res = await del(row);
      ElMessage({
        type: "success",
        message: "删除完成",
      });
      load();
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
  const res = await listPage(pageNo.value, pageSize.value);
  const { total, data } = res.data.data;
  totalNum.value = total;
  tableData.value = data;
};
onMounted(() => {
  load();
});
//弹框
const dialogFormVisible = ref(false);
const formLabelWidth = "100px";
const initForm = () => ({
  title: "",
  sex: "",
});
const form = reactive(initForm());
const save = () => {
  dialogFormVisible.value = false;
};
const downup = (url) => {
  window.location.href = url;
};
const handleSuccess = () => {
  ElMessage({
    showClose: true,
    message: "文件上传成功",
    type: "success",
  });
  load();
};
const handleError = (e) => {
  console.log(e, "上传失败");
};
</script>

<template>
  <div class="page">
    <el-card class="box-card">
      <template #header>
        <el-upload
          action="http://localhost:8000/file/upload"
          :show-file-list="false"
          :on-success="handleSuccess"
          :on-error="handleError"
          style="float: left"
        >
          <el-button type="primary" :icon="Upload">上传文件</el-button>
        </el-upload>
        <el-button class="ml10" @click="handleDelAll" type="danger" :icon="Delete"
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
        <el-table-column label="id">
          <template #default="scope">
            {{ scope.row.id }}
          </template>
        </el-table-column>
        <el-table-column label="名称">
          <template #default="scope">
            {{ scope.row.name }}
          </template>
        </el-table-column>
        <el-table-column label="类型">
          <template #default="scope">
            <div>{{ scope.row.type }}</div>
          </template>
        </el-table-column>
        <el-table-column label="大小">
          <template #default="scope">
            <div>{{ scope.row.size }}</div>
          </template>
        </el-table-column>
        <el-table-column label="地址">
          <template #default="scope">
            <el-image style="width: 60px; height: 50px" :src="scope.row.url" />
          </template>
        </el-table-column>
        <el-table-column label="下载">
          <template #default="scope">
            <el-button @click="downup(scope.row.url)">下载图片</el-button>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template #default="scope">
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
      <el-dialog v-model="dialogFormVisible" title="添加">
        <el-upload
          class="avatar-uploader"
          action="http://localhost:8000/file/"
          :show-file-list="false"
          :on-success="handleAvatarSuccess"
          :before-upload="beforeAvatarUpload"
        >
          <img v-if="imageUrl" :src="imageUrl" class="avatar" />
          <el-icon v-else class="avatar-uploader-icon"><Plus /></el-icon>
        </el-upload>
        <template #footer>
          <span class="dialog-footer">
            <el-button @click="dialogFormVisible = false">取消</el-button>
            <el-button type="primary" @click="save"> 确定 </el-button>
          </span>
        </template>
      </el-dialog>
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
