<script setup>
import { onMounted, ref, watch, reactive } from "vue";
import { Edit, Delete } from "@element-plus/icons-vue";
import { ElMessage, ElMessageBox } from "element-plus";
import { add, del, update, dels, list } from "../../../api/user";
//搜索
const name = ref("");
const search = () => {};
const reset = () => {};

//添加
const handleAdd = () => {
  dialogFormVisible.value = true;
};
//编辑
const handleEdit = (row) => {
  console.log(row);
};

//批量删除
const multiRows = ref();
const handleDelAll = () => {
  let rows = multiRows.value;
  let rowsData = rows.getSelectionRows();
  console.log(rowsData);
  ElMessageBox.confirm("你确定要批量删除数据吗？", {
    confirmButtonText: "确定",
    cancelButtonText: "取消",
    type: "warning",
  })
    .then(() => {
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

//删除
const handleDelete = (row) => {
  console.log(row);
};
//列表
const load = () => {};
onMounted(() => {
  load();
});
const tableData = [
  {
    date: "2016-05-03",
    name: "Tom",
    address: "No. 189, Grove St, Los Angeles",
  },
  {
    date: "2016-05-02",
    name: "Tom",
    address: "No. 189, Grove St, Los Angeles",
  },
  {
    date: "2016-05-04",
    name: "Tom",
    address: "No. 189, Grove St, Los Angeles",
  },
  {
    date: "2016-05-01",
    name: "Tom",
    address: "No. 189, Grove St, Los Angeles",
  },
];
//分页
const pageNo = ref(1);
const pageSize = ref(4);
const totalNum = ref(0);
const handleCurrentChange = (val) => {
  console.log(val);
};
const handleSizeChange = (val) => {
  console.log(val);
};

//弹框
const dialogFormVisible = ref(false);
const formLabelWidth = "100px";
const form = reactive({
  title: "",
  sex: "",
});
const save = () => {
  dialogFormVisible.value = false;
};
</script>

<template>
  <div class="page">
    <el-row>
      <el-col :span="24"
        ><div class="mb10">
          <el-input
            suffix-icon="el-icon-search"
            v-model="name"
            placeholder="请输入内容"
            style="width: 200px"
          ></el-input>
          <el-button type="primary" class="ml10" @click="search"
            >搜索</el-button
          >
          <el-button type="info" class="ml10" @click="reset">重置</el-button>
        </div>
      </el-col>
      <el-col :span="24"
        ><div class="mb10">
          <el-button @click="handleAdd" type="primary" :icon="Edit" class="ml10"
            >新增</el-button
          >
          <el-button
            @click="handleDelAll"
            type="danger"
            :icon="Delete"
            class="ml10"
            >批量删除</el-button
          >
        </div>
      </el-col>
      <el-col :span="24"
        ><div class="mb10">
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
            <el-table-column label="Date" width="180">
              <template #default="scope">
                <div style="display: flex; align-items: center">
                  <span style="margin-left: 10px">{{ scope.row.date }}</span>
                </div>
              </template>
            </el-table-column>
            <el-table-column label="Name" width="180">
              <template #default="scope">
                <el-popover
                  effect="light"
                  trigger="hover"
                  placement="top"
                  width="auto"
                >
                  <template #default>
                    <div>name: {{ scope.row.name }}</div>
                    <div>address: {{ scope.row.address }}</div>
                  </template>
                  <template #reference>
                    <el-tag>{{ scope.row.name }}</el-tag>
                  </template>
                </el-popover>
              </template>
            </el-table-column>
            <el-table-column label="Operations">
              <template #default="scope">
                <el-button size="small" @click="handleEdit(scope.row)"
                  >编辑</el-button
                >
                <el-button
                  size="small"
                  type="danger"
                  @click="handleDelete(scope.row)"
                  >删除</el-button
                >
              </template>
            </el-table-column>
          </el-table>
        </div></el-col
      >
      <el-col :span="24"
        ><div class="mb10">
          <el-pagination
            v-model:current-page="pageNo"
            v-model:page-size="pageSize"
            :page-sizes="[2, 4, 6, 8]"
            layout="total, sizes, prev, pager, next, jumper"
            :total="totalNum"
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
          /></div
      ></el-col>
    </el-row>
    <el-dialog v-model="dialogFormVisible" title="添加">
      <el-form :model="form">
        <el-form-item label="标题" :label-width="formLabelWidth">
          <el-input v-model="form.title" autocomplete="off" />
        </el-form-item>
        <el-form-item label="性别" :label-width="formLabelWidth">
          <el-select v-model="form.sex" placeholder="请选择相关内容">
            <el-option label="男" value="1" />
            <el-option label="女" value="0" />
          </el-select>
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取消</el-button>
          <el-button type="primary" @click="save"> 确定 </el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<style scoped>
</style>
