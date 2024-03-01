<script setup>
import { onMounted, ref, watch, watchEffect } from "vue";
import { getRoleResources } from "../api/role";

// 接收数据
const prop = defineProps(["resourceData", "roleId"]);

//初始化数据设置

onMounted(async () => {
  const res = await getRoleResources(prop.roleId);
  checkedIds.value = res.data.data;
});

const checkAll = ref(false); // 全选、全不先的初始值

const checkedIds = ref([]); // 用于 存储 选中的项 的 id
const allItemIds = []; // 用于 存储 当前的children 的 id

//发送信息，通知父组件

const emit = defineEmits(["postCheckedIds"]);

//半选状态的初始值
const isIndeterminate = ref(
  checkedIds.value.length > 0 && checkedIds.value.length < allItemIds.length
);

//遍历子元素的相关数据，填充--- checkedIds，allItemIds


prop.resourceData.children.forEach((item) => {
  allItemIds.push(item.id);
  //item.selected && checkedIds.value.push(item.id)
});

const handleCheckAllChange = (val) => {
  checkedIds.value = val ? allItemIds : [];
  isIndeterminate.value = false;
};
const handleCheckedCitiesChange = (value) => {
  const checkedCount = value.length;
  checkAll.value = checkedCount === allItemIds.length;
  isIndeterminate.value = checkedCount > 0 && checkedCount < allItemIds.length;
};



watchEffect(() => {
  emit("postCheckedIds", checkedIds);
  if (checkedIds.value.length == 0) {
    checkAll.value = false;
    isIndeterminate.value = false;
  }
});
</script>

<template>
  <el-card class="box-card mb10">
    <template #header>
      <el-checkbox
        v-model="checkAll"
        :indeterminate="isIndeterminate"
        @change="handleCheckAllChange"
        >{{ prop.resourceData.resourceName }}</el-checkbox
      >
    </template>
    <el-checkbox-group v-model="checkedIds" @change="handleCheckedCitiesChange">
      <el-row>
        <el-col
          :span="8"
          v-for="item in prop.resourceData.children"
          :key="item.id"
        >
          <el-checkbox :label="item.id">{{ item.resourceName }}</el-checkbox>
        </el-col>
      </el-row>
    </el-checkbox-group>
  </el-card>
</template>

<style scoped>
.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.text {
  font-size: 14px;
}

.item {
  margin-bottom: 18px;
}

.box-card {
  width: auto;
}
</style>
