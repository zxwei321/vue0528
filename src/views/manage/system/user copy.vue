<script setup>
import { onMounted, ref, watch, reactive } from "vue";
import { Edit, Delete } from "@element-plus/icons-vue";
import { ElMessage, ElMessageBox } from "element-plus";
import { add, del, update, dels, list, listParams } from "../../../api/user";
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
  Object.assign(form,initFormData())
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
  Object.assign(form,{...row})
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
const dialogFormVisible = ref(false);
const formLabelWidth = "100px";
const initFormData=()=>({ id: 0,
  username: "",
  password: "",
  nickname: "",
  phone: "",
  avatar: "",
})
const form = reactive(initFormData());
const save = async () => {
  if (form.id > 0) {
    await update(form);
    ElMessage({
      showClose: true,
      message: "修改成功",
      type: "success",
    });
    load();
  } else {
    await add(form);
    ElMessage({
      showClose: true,
      message: "添加成功",
      type: "success",
    });
    load();
  }

  dialogFormVisible.value = false;
};

const squareUrl ="https://cube.elemecdn.com/9/c2/f0ee8a3c7c9638a54940382568c9dpng.png"
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
          <el-table :data="tableData" :header-cell-style="{'background': '#EBEEF5 !important','font-size': '16px'}" style="width: 100%" ref="multiRows">
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
            <el-table-column label="头像">
              <template #default="scope">
                <el-image
                  style="width: 60px; height: 50px"
                  :src="scope.row.avatar || squareUrl"
                />
              </template>
            </el-table-column>
            <el-table-column label="操作">
              <template #default="scope">
                <el-button size="small" @click="handleEdit(scope.row)"
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
        </div></el-col
      >
      <el-col :span="24"
        ><div class="mb10">
          <el-pagination
            v-model:current-page="pageNo"
            v-model:page-size="pageSize"
            :page-sizes="[2, 4, 6]"
            layout="total, sizes, prev, pager, next, jumper"
            :total="totalNum"
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
          /></div
      ></el-col>
    </el-row>
    <el-dialog v-model="dialogFormVisible" title="添加">
      <el-form :model="form">
        <el-form-item label="用户名" :label-width="formLabelWidth">
          <el-input v-model="form.username" autocomplete="off" />
        </el-form-item>
        <el-form-item label="密码" :label-width="formLabelWidth">
          <el-input v-model="form.password" autocomplete="off" />
        </el-form-item>
        <el-form-item label="昵称" :label-width="formLabelWidth">
          <el-input v-model="form.nickname" autocomplete="off" />
        </el-form-item>
        <el-form-item label="电话" :label-width="formLabelWidth">
          <el-input v-model="form.phone" autocomplete="off" />
        </el-form-item>
        <el-form-item label="头像" :label-width="formLabelWidth">
          <el-input v-model="form.avatar" autocomplete="off" />
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
.page {
  padding: 0 20px !important;
}
</style>
