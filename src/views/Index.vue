<script setup>
import { ref } from "vue";
import { Fold, Expand } from "@element-plus/icons-vue";
import SideMenu from "../components/SideMenu.vue";
import Header from "../components/Header.vue";
import Tab from "../components/Tab.vue";
const isCollapse = ref(false);
const sideWidth = ref(200);
const colseMenu = () => {
  isCollapse.value = true;
  sideWidth.value = 65;
};
const openMenu = () => {
  isCollapse.value = false;
  sideWidth.value = 200;
};
</script>

<template>
  <div class="common-layout">
    <el-container>
      <el-aside :width="sideWidth + 'px'">
        <SideMenu :isCollapse="isCollapse" />
      </el-aside>
      <el-container>
        <el-header>
          <Header
            :isCollapse="isCollapse"
            @colseMenuPP="colseMenu"
            @openMenuPP="openMenu"
          />
        </el-header>
          <el-main>
            <Tab />
            <router-view />
          </el-main>
      </el-container>
    </el-container>
  </div>
</template>
<style scoped>
.el-header {
  display: flex;
  background: #eee;
  justify-content: baseline;
  align-items: center;
  height: 50px !important;
}
.el-main {
  padding: 0 !important;
  height: calc(100vh - 100px);
}
</style>
