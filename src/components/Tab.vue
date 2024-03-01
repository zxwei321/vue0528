<script setup>
import { ref, watch } from "vue";
import { useRouter, useRoute } from "vue-router";
import { useUserStore } from "../stores/user";
const router = useRouter();
const route = useRoute();
const store = useUserStore();

const editableTabsValue = ref("/home");
const editableTabs = ref(store.tabList);
watch(
  () => router.currentRoute.value.path,
  (newValue) => {
    editableTabsValue.value = newValue;
  },
  { immediate: true }
);

const handleTab = (item) => {
  if (route.path == item.props.name) return;
  router.push(item.props.name);
};
const removeTab = (targetName) => {
  let i = 0;
  if (editableTabs.value.length === 1) {
    return;
  }
  editableTabs.value.forEach((item, index) => {
    if (item.path === targetName) {
      store.delTab(index);
      i = index;
    }
  });
  if (route.path != targetName) {
    return;
  } else {
    if (i == editableTabs.value.length) {
      router.push(editableTabs.value[i - 1].path);
    } else {
      router.push(editableTabs.value[i].path);
    }
  }
};
</script>

<template>
  <el-tabs
    v-model="editableTabsValue"
    type="card"
    class="demo-tabs"
    closable
    @tab-remove="removeTab"
    @tab-click="handleTab"
  >
    <el-tab-pane
      v-for="item in editableTabs"
      :key="item.name"
      :label="item.title"
      :name="item.path"
    >
      {{ item.content }}
    </el-tab-pane>
  </el-tabs>
</template>

<style scoped>
.demo-tabs > .el-tabs__content {
  padding: 32px;
  color: #6b778c;
  font-size: 32px;
  font-weight: 600;
}
</style>
