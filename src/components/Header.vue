<script setup>
import { useRouter, useRoute } from "vue-router";
import { ArrowDown } from "@element-plus/icons-vue";
import Breadcrumb from "../components/Breadcrumb.vue";
import { useUserStore } from "../stores/user";
const router = useRouter();
const route = useRoute();
const store = useUserStore();

const props = defineProps({
  isCollapse: Boolean,
});

const emit = defineEmits(["colseMenuPP", "openMenuPP"]);
const openMenu = () => {
  emit("openMenuPP");
};
const colseMenu = () => {
  emit("colseMenuPP");
};
const logout = () => {
  router.push("/login");
  // store.menuTree = [];
  store.tabList = [
    {
      title: "首页",
      name: "首页",
      path: "/home",
    },
  ];
};
const person = () => {
  router.push("/person");
};
</script>

<template>
  <div class="left">
    <span @click="openMenu" class="fl" v-if="isCollapse"
      ><el-icon><Expand /></el-icon
    ></span>
    <span @click="colseMenu" class="fl" v-else
      ><el-icon><Fold /></el-icon
    ></span>
    <span class="fl ml10 mt2"> <Breadcrumb /></span>
  </div>
  <div class="right">
    <el-avatar :src="store.avatarImg" />
    <el-dropdown>
      <span class="el-dropdown-link">
        {{ store.nickname }}
        <el-icon class="el-icon--right">
          <arrow-down />
        </el-icon>
      </span>
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item
            ><span @click="person">个人中心</span></el-dropdown-item
          >
          <el-dropdown-item
            ><span @click="router.push('/password')">密码修改</span></el-dropdown-item
          >
          <el-dropdown-item><span @click="logout">退出</span></el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
  </div>
</template>

<style scoped>
.example-showcase .el-dropdown-link {
  cursor: pointer;
  color: var(--el-color-primary);
  display: flex;
  align-items: center;
}
.left {
  flex: 1;
}
.right {
  width: 150px;
  display: flex;
  justify-content: space-around;
  align-items: center;
}
.ml10 {
  margin-left: 10px;
}
.fl {
  float: left;
}
.mt2 {
  margin-top: 2px;
}
</style>
