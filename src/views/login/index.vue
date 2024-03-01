<script setup>
import { onMounted, reactive, ref } from "vue";
import { useRouter } from "vue-router";
import { ElMessage } from "element-plus";
import { useUserStore } from "../../stores/user";

import { setRoutes } from "../../router";
import { setToken } from "../../utils/token";

import { login } from "../../api/user";
import { list } from "../../api/menu";

const store = useUserStore();

const add = () => {
  store.increment();
};

const router = useRouter();
const ruleFormRef = ref();
const ruleForm = reactive({
  username: "admin",
  password: "123456",
});
const rules = reactive({
  username: [
    { required: true, message: "请输入用户名", trigger: "blur" },
    { min: 2, max: 10, message: "长度为2-10个字符", trigger: "blur" },
  ],
  password: [
    { required: true, message: "请输入密码", trigger: "blur" },
    { min: 2, max: 10, message: "长度为2-10个字符", trigger: "blur" },
  ],
});

//方法
const submitForm = (formEl) => {
  if (!formEl) return;
  formEl.validate(async (valid, fields) => {
    if (valid) {
      const res = await login(ruleForm.username, ruleForm.password);
      //  store.menuTree = oneMenu;
      const { code, data } = res.data;
      store.info = data;
      store.avatarImg = data.avatar;
      store.nickname = data.nickname;
      store.menus = data.menus;
      sessionStorage.setItem("permission", JSON.stringify(data.permission));
      sessionStorage.setItem("menus", JSON.stringify(data.menus));
      setToken(data.token)
      //执行一下 添加动态路由
      setRoutes();
      //请求数据
      if (code == "200") {
        ElMessage({
          showClose: true,
          message: "登录成功",
          type: "success",
        });
        router.push("/index");
      } else {
        ElMessage({
          showClose: true,
          message: "失败",
          type: "error",
        });
      }
    } else {
      console.log("error submit!", fields);
    }
  });
};
const keyDown = (e) => {
  if (e.keyCode == 13 || e.keyCode == 100) {
    submitForm(formEl); // 定义的登录方法
  }
};
</script>

<template>
  <div class="login_container">
    <div class="login_box">
      <h2 style="margin-top: 40px; text-align: center">
        用户登录-----{{ store.count }}
      </h2>
      <el-form
        ref="ruleFormRef"
        :model="ruleForm"
        :rules="rules"
        label-width="120px"
        class="login_form"
      >
        <el-form-item label="用户名" prop="username">
          <el-input v-model="ruleForm.username" />
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input type="password" v-model="ruleForm.password" />
        </el-form-item>
        <el-form-item>
          <el-button
            type="primary"
            @click="submitForm(ruleFormRef)"
          >
            登录
          </el-button>
          <el-button type="primary" @click="add()"> 添加 </el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<style scoped>
.login_container {
  background-color: #2b4b6b;
  /* background: url("/src/assets/bg.jpg") no-repeat;
  background-size:100% 100%; */
  /* background-image: linear-gradient(to bottom right, #fc4468, #3f5ef8); */
  background-image: linear-gradient(to bottom right, #000000, #3f5ef8);
  height: 100vh;
}
.login_box {
  width: 450px;
  height: 300px;
  background-color: #fff;
  border-radius: 10px;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}
.login_form {
  position: absolute;
  top: 100px;
  width: 100%;
  padding: 0 60px 0 0;
  box-sizing: border-box;
}
</style>
