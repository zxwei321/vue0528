<script setup>
import { reactive, ref, watch } from "vue";
import { ElMessage } from "element-plus";
import { add, update } from "../../../api/menu";
const prop = defineProps(["tableData"]);
const dialogFormVisible = ref(false);
const formLabelWidth = "100px";

const initForm = () => ({
  name: "",
  title: "",
  path: "",
  icons: "",
  component: "",
  shown: true,
  pid: "",
  ordernumb:0
});

const form = reactive(initForm());

const dialogTitle = ref();
const isCreate = ref(true);
//发送信息
const emit = defineEmits(["on-submit"]);

const dialogShow = (row) => {
  Object.assign(form, initForm());
  selectMenuId.value = "";
  if (row) {
    Object.assign(form, { ...row });
    selectMenuId.value = row.pid;
    dialogTitle.value = "编辑";
    isCreate.value = false;
  } else {
    dialogTitle.value = "新增";
    isCreate.value = true;
  }
  dialogFormVisible.value = true;
};
//提交相关数据
const onSave = async () => {
  form.pid = selectMenuId.value;
  console.log(form, "form");
  if (isCreate.value) {
    await add(form);
    emit("on-submit");
    ElMessage({
      showClose: true,
      message: "提交成功",
      type: "success",
    });
  } else {
    await update(form);
    emit("on-submit");
    ElMessage({
      showClose: true,
      message: "修改成功",
      type: "success",
    });
  }
  dialogFormVisible.value = false;
};

// 对外暴露方法
defineExpose({
  dialogShow,
});


const isTopMenu = ref(true);
const selectMenuId = ref();
const disabled = ref(true);

// tree 对外的属性挂载
const props = {
  label: "name",
  children: "children",
  value: "id",
};
watch(isTopMenu, () => {
  disabled.value = !disabled.value;
});
</script>

<template>
  <el-dialog
    v-model="dialogFormVisible"
    :title="dialogTitle + '信息'"
    draggable
  >
    <el-form :model="form">
      <el-row>
        <el-col :span="12"
          ><el-form-item label="菜单名称" :label-width="formLabelWidth">
            <el-input v-model="form.name" autocomplete="off" /> </el-form-item
        ></el-col>
        <el-col :span="12">
          <el-form-item label="菜单标题" :label-width="formLabelWidth">
            <el-input v-model="form.title" autocomplete="off" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12"
          ><el-form-item label="菜单路径" :label-width="formLabelWidth">
            <el-input v-model="form.path" autocomplete="off" /> </el-form-item
        ></el-col>
        <el-col :span="12">
          <el-form-item label="菜单模板" :label-width="formLabelWidth">
            <el-input v-model="form.component" autocomplete="off" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12"
          ><el-form-item label="菜单图标" :label-width="formLabelWidth">
            <el-input v-model="form.icons" autocomplete="off" /> </el-form-item
        ></el-col>
        <el-col :span="12">
          <el-form-item label="是否显示" :label-width="formLabelWidth">
            <el-select v-model="form.shown" placeholder="请选择">
              <el-option label="是" :value="true" />
              <el-option label="否" :value="false" />
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12"
          ><el-form-item label="顶级菜单" :label-width="formLabelWidth">
            <el-switch
              v-model="isTopMenu"
              inline-prompt
              active-text="是"
              inactive-text="否"
            />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="二级菜单" :label-width="formLabelWidth">
            <el-tree-select
              v-model="selectMenuId"
              :data="tableData"
              :props="props"
              check-strictly
              :disabled="disabled"
            />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <el-form-item label="菜单排序" :label-width="formLabelWidth">
            <el-input v-model="form.ordernumb" autocomplete="off" />
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取消</el-button>
        <el-button type="primary" @click="onSave"> 提交 </el-button>
      </span>
    </template>
  </el-dialog>
</template>

<style scoped>
</style>
