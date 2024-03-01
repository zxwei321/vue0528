<script setup>
import { ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import ResourceItem from "../../../components/ResourceItem.vue";
import { addRoleResource } from "../../../api/role";
import { ElMessage } from "element-plus";

import useResource from "../../../composables/useResource";
const { load, resourceData } = useResource();
const routes = useRoute();
const router = useRouter();
const chechIdsData = ref();
console.log(routes.params.id, "routes");

load();

const idsArray = [];

const save = async () => {
   console.log(idsArray,'22222222222222222');
  const allCheckids = idsArray.reduce((tmp, item) => {
    return [...tmp, ...item.value];
  }, []);
  const res = await addRoleResource(routes.params.id, allCheckids);
  ElMessage({
    message: "添加资源成功",
    type: "success",
  });
  //router.push("/system/role");
  
};

const addCheckedIds = (data) => {
  console.log(data,'1111111111111111111111');
  idsArray.push(data);
};

const clean = () => {
  idsArray.forEach((item) => {
    item.value = [];
  });
};
</script>

<template>
  <div class="page">
    <ResourceItem
      v-for="item in resourceData"
      :key="item.id"
      :resourceData="item"
      :roleId="routes.params.id"
      @postCheckedIds="addCheckedIds"
    />
    <div class="submit">
      <el-button type="primary" @click="save">保存</el-button>
      <el-button type="info" plain @click="clean">清空</el-button>
      <el-button type="success" plain @click="router.push('/system/role')">返回</el-button>
    </div>
  </div>
</template>

<style scoped>
.submit {
  text-align: center;
  margin-top: 20px;
}
</style>
