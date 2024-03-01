<script setup>
import { onMounted, ref, watch, reactive } from "vue";
import { useRouter } from 'vue-router'
import { Edit, Delete } from "@element-plus/icons-vue";
import { useRole } from "../../../composables/useRole";
import roleDialog from "./roleDialog.vue"
import roleAllocateDialog  from './roleAllocateDialog.vue'

const router = useRouter()

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
  handleDelAll
} = useRole();
load();
//搜索
const name = ref("");
const search = () => {};
const reset = () => {};

const allocateDialog = ref();
const allocresource = (id)=>{
  router.push({name:"allocresource",params:{id}})
}

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
          <el-button @click="dialog.dialogShow(0)" type="primary" :icon="Edit" class="ml10"
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
            <el-table-column type="index" label="序号" width="100" />
            <el-table-column prop="name" label="角色名称"  />
            <el-table-column prop="description" label="角色描述"  />
            <el-table-column prop="flag" label="角色标记"  />
            
            <el-table-column label="操作" width="300">
              <template #default="scope">
                <el-button size="small" @click="allocateDialog.dialogTreeShow(scope.row.id)"
                  >分配菜单</el-button
                >
                <el-button size="small" @click="allocresource(scope.row.id)"
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
    <roleDialog ref="dialog" @handleSubmit="load" />
    <roleAllocateDialog ref="allocateDialog" />
  </div>
</template>

<style scoped>
</style>
