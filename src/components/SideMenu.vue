<script setup>
import { ref, watch } from "vue";
import { House, Setting, User, Menu } from "@element-plus/icons-vue";
import { useRouter, useRoute } from "vue-router";
import { useUserStore } from "../stores/user";
import navData from "../utils/navData";

//第一步，需要监听路由的变化
const router = useRouter();
const route = useRoute();

const store = useUserStore();

const props = defineProps({
  isCollapse: Boolean,
});
const title = ref("后台管理系统");
const selectDef = ref("/home");
watch(
  () => router.currentRoute.value.path,
  (newValue) => {
    selectDef.value = newValue;
  },
  { immediate: true }
);

const selectMenu = (item) => {
  let repeat = store.tabList.some((v) => v.path === item.path);
  if (repeat) return;
  store.addTabs(item);
};

</script>

<template>
  <el-menu
    active-text-color="#ffd04b"
    background-color="#545c64"
    :collapse-transition="false"
    class="el-menu-vertical-demo"
    :default-active="selectDef"
    text-color="#fff"
    :collapse="isCollapse"
    router
  >
    <div class="logo">
      <img
        src="../assets/logo.svg"
        style="width: 30px; margin-right: 5px; position: relative; top: 5px"
        alt="Logo"
      />
      <b>{{ isCollapse ? "" : title }}</b>
    </div>
    <template v-for="item in store.menus" :key="item.path">
      <el-menu-item
        :index="item.path"
        v-if="item.children.length === 0"
        @click="selectMenu(item)"
      >
        <el-icon><component :is="item.icons"> </component></el-icon>
        <span>{{ item.name }}</span>
      </el-menu-item>
      <el-sub-menu :index="item.path" v-else>
        <template #title>
          <el-icon><component :is="item.icons"> </component></el-icon>
          <span>{{ item.name }}</span>
        </template>
        <el-menu-item
          :index="subItem.path"
          v-for="subItem in item.children"
          :key="subItem.path"
          @click="selectMenu(subItem)"
        >
          <el-icon><component :is="subItem.icons"> </component></el-icon>
          <span>{{ subItem.name }}</span>
        </el-menu-item>
      </el-sub-menu>
    </template>
  </el-menu>
</template>

<style scoped>
.el-menu {
  height: 100vh;
  overflow-x: hidden;
}
.logo {
  font-size: 18px;
  color: #fff;
  text-align: center;
  height: 60px;
  line-height: 60px;
}
</style>
