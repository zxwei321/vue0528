<script setup>
import { onMounted, ref, watch } from "vue";
import { useRouter, useRoute } from "vue-router";
import { ArrowRight } from "@element-plus/icons-vue";

const router = useRouter();
const route = useRoute();

const list = ref();
//第一步，需要监听路由的变化
watch(
  () => router.currentRoute.value.path,
  () => {
    list.value = route.matched
  },
  {immediate:true}
);
</script>

<template>
  <el-breadcrumb :separator-icon="ArrowRight">
    <el-breadcrumb-item :to="item.path" v-for="item in list" :key="item.path">{{item.meta.title ==="首页"?"":item.meta.title}}</el-breadcrumb-item>
  </el-breadcrumb>
</template>

<style scoped>
</style>
