<script setup>
import { onMounted, ref, watch, reactive } from "vue";
import { Edit, Delete } from "@element-plus/icons-vue";
import { ElMessage, ElMessageBox } from "element-plus";
import { add, del, update, dels, list, listPage } from "../../../api/menu";
//搜索
const name = ref("");
const search = () => {};
const reset = () => {};

//添加
const handleAdd = () => {
  dialogFormVisible.value = true;
   Object.assign(form,initForm())
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

//删除
const handleDelete = (row) => {
  ElMessageBox.confirm("你确定要批量删除数据吗？", {
    confirmButtonText: "确定",
    cancelButtonText: "取消",
    type: "warning",
  })
    .then(async () => {
      await del(row);
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
//列表
const topMenu = ref([]);
const load = async () => {
  const res = await listPage(pageNo.value, pageSize.value);
  const resALL = await list();
  const { total, data } = res.data.data;
  totalNum.value = total;
  tableData.value = data;
  topMenu.value = resALL.data.data.filter((item) => item.level === 0);
};
onMounted(() => {
  load();
});
const tableData = ref([]);
//分页
const pageNo = ref(1);
const pageSize = ref(8);
const totalNum = ref(0);
const handleCurrentChange = (val) => {
  pageNo.value = val;
  load();
};
const handleSizeChange = (val) => {
  pageSize.value = val;
  load();
};

//弹框
const dialogFormVisible = ref(false);
const formLabelWidth = "100px";
const initForm = () => ({
  id: 0,
  name: "",
  title: "",
  path: "",
  icons: "",
  component: "",
  shown: true,
  pid: -1,
  level: 0,
  ordernumb: 0,
});
const form = reactive(initForm());
// 添加
const save = async () => {
  if (form.id > 0) {
    if (form.pid > 0) {
      form.level = 1;
    }
    await update(form);
  } else {
    if (form.pid > 0) {
      form.level = 1;
    }
    await add(form);
  }
  ElMessage({
    showClose: true,
    message: "添加成功",
    type: "success",
  });
  load();
  dialogFormVisible.value = false;
};
//编辑
const handleEdit = (row) => {
  console.log(row);
  dialogFormVisible.value = true;
  Object.assign(form,{...row})
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
            <el-table-column label="id">
              <template #default="scope">
                {{ scope.row.id }}
              </template>
            </el-table-column>
            <el-table-column label="菜单名称">
              <template #default="scope">
                {{ scope.row.name }}
              </template>
            </el-table-column>
            <el-table-column label="菜单标题">
              <template #default="scope">
                {{ scope.row.title }}
              </template>
            </el-table-column>
            <el-table-column label="菜单路径">
              <template #default="scope">
                {{ scope.row.path }}
              </template>
            </el-table-column>
            <el-table-column label="菜单图标">
              <template #default="scope">
                {{ scope.row.icons }}
              </template>
            </el-table-column>
            <el-table-column label="菜单模板">
              <template #default="scope">
                {{ scope.row.component }}
              </template>
            </el-table-column>
            <el-table-column label="是否显示">
              <template #default="scope">
                {{ scope.row.shown === true ? "是" : "否" }}
              </template>
            </el-table-column>
            <el-table-column label="父级">
              <template #default="scope">
                {{ scope.row.pid }}
              </template>
            </el-table-column>
            <el-table-column label="层级">
              <template #default="scope">
                {{ scope.row.level }}
              </template>
            </el-table-column>
            <el-table-column label="排序">
              <template #default="scope">
                {{ scope.row.ordernumb }}
              </template>
            </el-table-column>

            <el-table-column label="操作" width="150" align="center">
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
        <el-form-item label="菜单名称" :label-width="formLabelWidth">
          <el-input v-model="form.name" autocomplete="off" />
        </el-form-item>
        <el-form-item label="菜单标题" :label-width="formLabelWidth">
          <el-input v-model="form.title" autocomplete="off" />
        </el-form-item>
        <el-form-item label="菜单配置" :label-width="formLabelWidth">
          <el-select v-model="form.pid" placeholder="请选择相关内容">
            <el-option label="顶级菜单" :value="-1" />
            <el-option
              v-for="item in topMenu"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="菜单路径" :label-width="formLabelWidth">
          <el-input v-model="form.path" autocomplete="off" />
        </el-form-item>
        <el-form-item label="菜单图标" :label-width="formLabelWidth">
          <el-input v-model="form.icons" autocomplete="off" />
        </el-form-item>
        <el-form-item label="是否显示" :label-width="formLabelWidth">
          <el-radio-group v-model="form.shown">
            <el-radio :label="true">是</el-radio>
            <el-radio :label="false">否</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="菜单模板" :label-width="formLabelWidth">
          <el-input v-model="form.component" autocomplete="off" />
        </el-form-item>
        <el-form-item label="排序" :label-width="formLabelWidth">
          <el-input v-model="form.ordernumb" autocomplete="off" />
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
