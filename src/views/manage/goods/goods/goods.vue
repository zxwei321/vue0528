<script setup>
import { onMounted, ref } from "vue";
import * as XLSX from "xlsx";
import {
  Search,
  Edit,
  Delete,
  EditPen,
  Download,
} from "@element-plus/icons-vue";
import { ElMessage, ElMessageBox } from "element-plus";
import goodsDialog from "./goodsDialog.vue";
import { formatTime } from "../../../../utils/dayjs";
import { list, del, dels, searchParams } from "../../../../api/goods";
const tableData = ref([]);

const pageNo = ref(1);
const pageSize = ref(5);
const totalNum = ref(0);
const multiRows = ref();
const title = ref("");
const dialog = ref();
// 表格表头样式
const headerCellStyle = ref({
  background: "#EBEEF5 !important",
  "font-size": "16px",
});

//搜索功能
const search = async () => {
  if (title.value) {
    const { data } = await searchParams(
      pageNo.value,
      pageSize.value,
      title.value
    );
    tableData.value = data.data.data;
    totalNum.value = data.data.total;
  }
};
const reset = () => {
  title.value = "";
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

//数据初始化
const load = async () => {
  const { data } = await list(pageNo.value, pageSize.value);
  tableData.value = data.data.data;
  totalNum.value = data.data.total;
};

onMounted(() => {
  load();
});
//分页功能
const handleSizeChange = (val) => {
  pageSize.valueval;
  load();
};
const handleCurrentChange = (val) => {
  pageNo.value = val;
  load();
};

const handleDownload = () => {
  ExportXlsx();
};

// 数据下载
const ExportXlsx = () => {
  // 创建工作表
  let head = {
    title: "商品名称",
    price: "商品价格",
    num: "商品数量",
    category: "规格类目",
    image: "商品图片",
    sellPoint: "商品卖点",
    releaseTime: "发布时间",
    description: "商品描述",
  };

  const list = tableData.value.map((item) => {
    const obj = {};
    for (const k in item) {
      if (head[k]) {
        obj[head[k]] = item[k];
      }
    }
    return obj;
  });

  const data = XLSX.utils.json_to_sheet(list);
  // 创建工作簿
  const wb = XLSX.utils.book_new();
  // 将工作表放入工作簿中
  XLSX.utils.book_append_sheet(wb, data, "data");
  // 生成文件并下载
  XLSX.writeFile(wb, "商品数据.xlsx");
};

const defaultImg = ref("../../../assets/imgDefault.png");
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
        <el-button type="info" :icon="Download" @click="handleDownload"
          >表格下载</el-button
        >
        <div style="float: right">
          <el-form :inline="true">
            <el-form-item>
              <el-input v-model="title" placeholder="请输入搜索内容" />
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
        ref="multiRows"
      >
        <el-table-column type="selection" width="55" />
        <el-table-column type="index" label="序号" width="100" />
        <el-table-column prop="title" label="商品名称" />
        <el-table-column prop="price" label="商品价格" />
        <el-table-column prop="num" label="商品数量" />
        <el-table-column prop="category" label="规格类目" />
        <el-table-column label="商品图片">
          <template #default="scope">
            <el-image
              style="width: 80px; height: 80px"
              :src="scope.row.image || defaultImg"
            />
          </template>
        </el-table-column>
        <el-table-column prop="sellPoint" label="商品卖点" />
        <el-table-column label="二维码图片">
          <template #default="scope">
            <el-image
              style="width: 80px; height: 80px"
              :src="scope.row.qrcodeImg || defaultImg"
            />
          </template>
        </el-table-column>
        <el-table-column
          prop="description"
          label="商品描述"
          show-overflow-tooltip
        />
        <el-table-column label="发布时间">
          <template #default="scope">
            {{ scope.row.releaseTime ? formatTime(scope.row.releaseTime) : "" }}
          </template>
        </el-table-column>
        <el-table-column label="操作" width="200" align="center">
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
        v-model:current-page="pageNo"
        v-model:page-size="pageSize"
        :page-sizes="[5, 10, 20, 30]"
        layout="total, sizes, prev, pager, next, jumper"
        :total="totalNum"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        class="mt10"
      />
      <goodsDialog ref="dialog" @on-submit="load" />
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
