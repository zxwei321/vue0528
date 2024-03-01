<script setup>
import { ref, watchEffect } from "vue";


const prop = defineProps(["resourceData"])

const getDataArray = []

const getData = ()=>{
  prop.resourceData.children.forEach(item => {
    getDataArray.push(item)
  });
}
getData()

console.log(getDataArray,'getDataArray');
//初始化数据
const checkAll = ref(false);
const isIndeterminate = ref(true);
const checkedids = ref([]);
const datas = ['beijin','beijin','beijin','beijin']

const handleCheckAllChange = (val) => {
  checkedids.value = val ? datas : [];
  isIndeterminate.value = false;
};
const handleCheckedCitiesChange = (value) => {
  const checkedCount = value.length;
  checkAll.value = checkedCount === datas.length;
  isIndeterminate.value = checkedCount > 0 && checkedCount < datas.length;
};

watchEffect(()=>{
  if(checkedids.value.length === 0){
    //console.log(checkAll.value,'watch');
    checkAll.value = false
  }
})
const emit = defineEmits(["postCheckedIds"]);

emit("postCheckedIds", checkedids);
</script>

<template>
  <el-card class="box-card">
    <template #header>
      <el-checkbox
        v-model="checkAll"
        :indeterminate="isIndeterminate"
        @change="handleCheckAllChange"
        >{{prop.resourceData.resourceName}}</el-checkbox
      >
    </template>
    <el-checkbox-group v-model="checkedids" @change="handleCheckedCitiesChange">
      <el-row>
        <el-col :span="8" v-for="item in datas" :key="item.id">
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
.el-card {
  margin-bottom: 10px;
}
</style>
