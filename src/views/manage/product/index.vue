<script setup>
import { onMounted, ref, watch, reactive } from "vue";
import { Edit, Delete, Download, Plus, ZoomIn } from "@element-plus/icons-vue";
import { ElMessage, ElMessageBox } from "element-plus";
import { add, del, update, dels, list, listParams } from "../../../api/product";

//搜索
const name = ref("");
const search = () => {};
const reset = () => {};

//添加
const handleAdd = () => {
  dialogFormVisible.value = true;
  Object.assign(form,initForm())
};

//表格数据及操作
const handleEdit = (row) => {
  dialogFormVisible.value = true;
  Object.assign(form,{...row})
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
//列表
const load = async () => {
  const res = await list(pageNo.value, pageSize.value);
  const { total, data } = res.data.data;
  totalNum.value = total;
  tableData.value = data;
};
onMounted(() => {
  load();
});
const tableData = ref([]);
//分页
const pageNo = ref(1);
const pageSize = ref(4);
const totalNum = ref(0);
const handleCurrentChange = (val) => {
  console.log(val);
  pageNo.value = val;
  load();
};
const handleSizeChange = (val) => {
  console.log(val);
  pageSize.value = val;
  load();
};

//弹框
const dialogFormVisible = ref(false);
const formLabelWidth = "100px";
const initForm = () => ({
  id: 0,
  name: "",
  brand: "",
  type: "",
  img: "",
});
const form = reactive(initForm());
const save = async () => {
  if (form.id > 0) {
    const res = await update(form);
    ElMessage({
      message: "更新成功",
      type: "success",
    });
  } else {
    const res = await add(form);
    ElMessage({
      message: "添加成功",
      type: "success",
    });
  }

  load();
  dialogFormVisible.value = false;
};
//上传图片
const dialogImageUrl = ref("");
const dialogVisible = ref(false);
const disabled = ref(false);
const uploadRef = ref();
const handleRemove = (file) => {
  console.log(file);
};

const handlePictureCardPreview = (file) => {
  dialogImageUrl.value = file.url;
  dialogVisible.value = true;
};

const handleDownload = (file) => {
  console.log(file);
};
const handleAvatarSuccess = (res) => {
  form.value.img = res;
};
const handleChange = (res) => {};
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
            <el-table-column label="产品名称">
              <template #default="scope">
                {{ scope.row.name }}
              </template>
            </el-table-column>
            <el-table-column label="产品品牌">
              <template #default="scope">
                {{ scope.row.brand }}
              </template>
            </el-table-column>
            <el-table-column label="产品类型">
              <template #default="scope">
                {{ scope.row.type }}
              </template>
            </el-table-column>
            <el-table-column label="产品图片">
              <template #default="scope">
                <el-image
                  style="width: 60px; height: 50px"
                  :src="scope.row.img || 'https://cube.elemecdn.com/e/fd/0fc7d20532fdaf769a25683617711png.png'"
                />
              </template>
            </el-table-column>
            <el-table-column label="操作" align="center">
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
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="产品名称" :label-width="formLabelWidth">
              <el-input v-model="form.name" autocomplete="off" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="产品品牌" :label-width="formLabelWidth">
              <el-input v-model="form.brand" autocomplete="off" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="类型" :label-width="formLabelWidth">
              <el-select v-model="form.type" placeholder="请选择相关内容">
                <el-option label="男装" value="男装" />
                <el-option label="女装" value="女装" />
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="产品图片" :label-width="formLabelWidth">
              <el-upload
                ref="uploadRef"
                action="http://localhost:8000/file/upload"
                list-type="picture-card"
                :limit="1"
                :on-success="handleAvatarSuccess"
                :on-change="handleChange"
              >
                <el-icon><Plus /></el-icon>

                <template #file="{ file }">
                  <div>
                    <img
                      class="el-upload-list__item-thumbnail"
                      :src="file.url"
                      alt=""
                    />
                    <span class="el-upload-list__item-actions">
                      <span
                        class="el-upload-list__item-preview"
                        @click="handlePictureCardPreview(file)"
                      >
                        <el-icon><zoom-in /></el-icon>
                      </span>
                      <span
                        class="el-upload-list__item-delete"
                        @click="handleDownload(file)"
                      >
                        <el-icon><Download /></el-icon>
                      </span>
                      <span
                        class="el-upload-list__item-delete"
                        @click="handleRemove(file)"
                      >
                        <el-icon><Delete /></el-icon>
                      </span>
                    </span>
                  </div>
                </template>
              </el-upload>

              <el-dialog v-model="dialogVisible">
                <img :src="dialogImageUrl" alt="Preview Image" />
              </el-dialog>
            </el-form-item>
          </el-col>
        </el-row>
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
.avatar-uploader .el-upload {
  border: 1px dashed var(--el-border-color);
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: var(--el-transition-duration-fast);
}
.el-icon {
  border: 1px dashed #8c939d !important;
  border-radius: 6px;
}

.avatar-uploader .el-upload:hover {
  border-color: var(--el-color-primary);
}

.el-icon.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  text-align: center;
}
</style>
