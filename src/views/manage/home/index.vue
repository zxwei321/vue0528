<script setup>
import { onMounted, ref } from "vue"
import Echarts1 from './echarts1.vue'
import Echarts2 from './echarts2.vue'
import Echarts3 from './echarts3.vue'
const activeName = ref('first')

const handleClick = (tab, event) => {
  console.log(tab, event)
}
</script>

<template>
  <div class="page">
    <el-row :gutter="20">
      <el-col :span="6">
        <el-card shadow="always">
          <div style="height:30px">
            <span style="float: left">
              <el-icon size="26" style="color:red">
              <Setting />
            </el-icon>
            </span>
            <span style="float:right">0 / 0</span>   
          </div>
          <span style="float:right; margin-bottom:10px">上线人数 / 总人数</span>
         </el-card>
      </el-col>
      <el-col :span="6">
        <el-card shadow="always">
          <div style="height:30px">
            <span style="float: left">
              <el-icon size="26" style="color:#4680ff">
              <Odometer />
            </el-icon>
            </span>
            <span style="float:right">0 / 0</span>
          </div>
          <span style="float:right; margin-bottom:10px">今日 / 昨日订单数</span>
         </el-card>
        </el-col>
      <el-col :span="6">
        <el-card shadow="always">
          <div style="height:30px">
            <span style="float: left">
              <el-icon size="26" style="color:#ffb64d">
              <Flag />
            </el-icon>
            </span>
            <span style="float:right">0 / 0</span>   
          </div>
          <span style="float:right; margin-bottom:10px">今日 / 昨日成交商品数</span>
         </el-card>
      </el-col>
      <el-col :span="6">
        <el-card shadow="always">
          <div style="height:30px">
            <span style="float: left">
              <el-icon size="26" style="color:#26dad2">
              <User />
            </el-icon>
            </span>
            <span style="float:right">0 / 0</span>   
          </div>
          <span style="float:right; margin-bottom:10px">今日 / 昨日新增用户</span>
         </el-card>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="24">
        <el-card class="box-card">
          <el-tabs v-model="activeName" class="demo-tabs" @tab-click="handleClick">
            <el-tab-pane label="成交额(元)" name="first">
             <Echarts1 />
            </el-tab-pane>
            <el-tab-pane label="订单个数" name="second">
              <Echarts2 />
            </el-tab-pane>
            <el-tab-pane label="成交数量" name="third">
              <Echarts3 />
            </el-tab-pane>
            <el-tab-pane label="在线人员" name="fourth">在线人员</el-tab-pane>
          </el-tabs>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<style scoped>
.el-row {
  margin-bottom: 20px;
}
.el-row:last-child {
  margin-bottom: 0;
}
.el-col {
  border-radius: 4px;
}

.grid-content {
  border-radius: 4px;
  min-height: 36px;
  background: #d3dce6;
}
</style>
