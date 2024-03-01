<script setup>
import { onMounted, ref, watch, reactive } from "vue";
import { ElMessage } from "element-plus";
import { add, update } from "../../../api/user";
import { lists } from "../../../api/role";

const dialogFormVisible = ref(false);
const formLabelWidth = "100px";
const initFormData = () => ({
  id: 0,
  username: "",
  password: "",
  nickname: "",
  phone: "",
  avatar: "",
  role: "",
});
const form = reactive(initFormData());

const emit =defineEmits(["on-submit"])

const createAdd = ref(false);
const formTitle = ref();
const dialogShow = (row) => {
    Object.assign(form,initFormData())
  if (row) {
    Object.assign(form,{...row})
    createAdd.value = false;
    formTitle.value = "编辑";

  } else {
    createAdd.value = true;
    formTitle.value = "新增";
  }
  roleList();
  dialogFormVisible.value = true;
};

//获取角色列表
const roleData = ref([]);
const roleList = async () => {
  const res = await lists();
  roleData.value = res.data.data;
};
const save = async () => {
  if (createAdd.value) {
    await add(form);
    ElMessage({
      showClose: true,
      message: "添加成功",
      type: "success",
    });
  } else {
    await update(form);
    ElMessage({
      showClose: true,
      message: "修改成功",
      type: "success",
    });
  }
    emit("on-submit")
  dialogFormVisible.value = false;
};
defineExpose({
  dialogShow,
});
</script>

<template>
  <el-dialog v-model="dialogFormVisible" :title="formTitle">
    <el-form :model="form">
      <el-row>
        <el-col :span="12">
          <el-form-item label="用户名" :label-width="formLabelWidth">
            <el-input v-model="form.username" autocomplete="off" />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="密码" :label-width="formLabelWidth">
            <el-input
              v-model="form.password"
              autocomplete="off"
            /> </el-form-item
        ></el-col>
      </el-row>
      <el-row>
        <el-col :span="12"
          ><el-form-item label="昵称" :label-width="formLabelWidth">
            <el-input
              v-model="form.nickname"
              autocomplete="off"
            /> </el-form-item
        ></el-col>
        <el-col :span="12"
          ><el-form-item label="电话" :label-width="formLabelWidth">
            <el-input v-model="form.phone" autocomplete="off" /> </el-form-item
        ></el-col>
      </el-row>
      <el-row>
        <el-col :span="12"
          ><el-form-item label="头像" :label-width="formLabelWidth">
            <el-input v-model="form.avatar" autocomplete="off" /> </el-form-item
        ></el-col>
        <el-col :span="12"
          ><el-form-item label="角色" :label-width="formLabelWidth">
            <el-select v-model="form.role" placeholder="请选择角色">
              <el-option
                v-for="item in roleData"
                :key="item.id"
                :label="item.flag"
                :value="item.flag"
              />
            </el-select> </el-form-item
        ></el-col>
      </el-row>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取消</el-button>
        <el-button type="primary" @click="save"> 提交 </el-button>
      </span>
    </template>
  </el-dialog>
</template>

<style scoped>
</style>
