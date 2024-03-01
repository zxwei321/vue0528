<script setup>
import { onMounted, reactive, ref } from "vue";
import { ElMessage } from "element-plus";
import { useUserStore } from "../../stores/user";
import { getOne, update } from "../../api/user";
const store = useUserStore();

const form = reactive({
  id: 0,
  username: "",
  nickname: "",
  avatar: "",
  phone: "",
  role:"",
});
const hide = ref(false);
const getInfo = async () => {
  const res = await getOne(store.info.id);
  const { id, username, nickname, avatar, phone, password ,role} = res.data.data;
  form.id = id;
  form.username = username;
  form.nickname = nickname;
  form.avatar = avatar;
  form.phone = phone;
  form.password = password;
  form.role = role;
};
onMounted(() => {
  getInfo();
});
const handleAvatarSuccess = (res)=>{
  form.avatar = res
}
const save = async () => {
  const res = await update(form);
  ElMessage({
    message: "提交成功",
    type: "success",
  });
  store.avatarImg=form.avatar
  store.nickname=form.nickname
};
const addCount = ()=>{
  store.increment();
}
</script>

<template>
  <div class="page">
    <el-row :gutter="12">
      <el-col :span="10">
        <el-card shadow="always">
          <el-form :model="form" label-width="120px">
            <el-upload
              class="avatar-uploader"
              action="http://localhost:8000/file/upload"
              :show-file-list="false"
              :on-success="handleAvatarSuccess"
            >
              <img v-if="form.avatar" :src="form.avatar" class="avatar" />
              <el-icon v-else class="avatar-uploader-icon"><Plus /></el-icon>
            </el-upload>
            <el-form-item label="用户名">
              <el-input disabled v-model="form.username" />
            </el-form-item>
            <el-form-item label="密码" v-if="hide">
              <el-input disabled v-model="form.password" />
            </el-form-item>
            <el-form-item label="密码" v-if="hide">
              <el-input disabled v-model="form.role" />
            </el-form-item>
            <el-form-item label="昵称">
              <el-input v-model="form.nickname" />
            </el-form-item>
            <el-form-item label="电话">
              <el-input v-model="form.phone" />
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="save">提交</el-button>
              <!-- <el-button type="primary" @click="addCount">添加数据</el-button> -->
            </el-form-item>
          </el-form>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<style scoped>
.avatar-uploader {
  cursor: pointer;
  position: relative;
  text-align: center !important;
  margin-bottom:10px;
}
.el-icon{
  border: 1px dashed #8c939d !important;
  border-radius: 6px;
}
.el-icon.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  text-align: center;
}

.el-upload {
  border-radius: 6px;
}
.avatar{
  width: 150px;
    height: 150px;
    display: block;
    border:1px solid #eee;
    border-radius: 10px;
}
</style>
