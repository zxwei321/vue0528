<script setup>
import { onMounted, reactive, ref, watch } from "vue";
import { add, update } from "../../../api/org";

const prop = defineProps(["tableData"]);
const dialogFormVisible = ref(false);
const formLabelWidth = "140px";
const initForm = () => ({
  code: "",
  name: "",
  pid: "",
});

const form = reactive(initForm());

const cteaterAdd = ref(false);
const dialogTitle = ref();

const emit = defineEmits(["on-submit"]);

const dialogShow = (row) => {
  Object.assign(form, initForm());
  isToOrg.value = true;
  value.value = "";
  if (row) {
    cteaterAdd.value = false;
    dialogTitle.value = "编辑";
    isToOrg.value = false;
    if(row.pid === null){
      isToOrg.value = true;
    }
    value.value = row.id;
    Object.assign(form, { ...row });
  } else {
    cteaterAdd.value = true;
    dialogTitle.value = "新增";
  }
  dialogFormVisible.value = true;
};
defineExpose({
  dialogShow,
});

const value = ref();
const isToOrg = ref(true);
const disabled = ref(true);
watch(isToOrg, () => {
  disabled.value = !disabled.value;
});
const props = {
  label: "name",
  children: "children",
  value: "id",
};

const onSave = async () => {
  if (cteaterAdd.value) {
    if (isToOrg.value) {
      form.pid = "";
      const res = await add(form);
      emit("on-submit");
    } else {
      form.pid = value.value;
      const res = await add(form);
      emit("on-submit");
    }
  } else {
    await update(form);
    emit("on-submit");
  }

  dialogFormVisible.value = false;
};
</script>

<template>
  <el-dialog v-model="dialogFormVisible" :title="dialogTitle + '机构信息'">
    <el-form :model="form">
      <el-row>
        <el-col :span="12">
          <el-form-item label="机构编码" :label-width="formLabelWidth">
            <el-input v-model="form.code" autocomplete="off" />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="机构名称" :label-width="formLabelWidth">
            <el-input v-model="form.name" autocomplete="off" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="顶级机构" :label-width="formLabelWidth">
            <el-switch
              v-model="isToOrg"
              inline-prompt
              active-text="是"
              inactive-text="否"
            />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="二级机构" :label-width="formLabelWidth">
            <el-tree-select
              v-model="value"
              :data="prop.tableData"
              :disabled="disabled"
              :props="props"
              check-strictly
            />
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
