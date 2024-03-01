<script setup>
import { onMounted, ref } from "vue"
//  按需引入 echarts
import * as echarts from "echarts"
// 引入地图文件
import chinaJson from '../../../assets/mapsJson/china.json'
const main = ref()

onMounted(
  () => {
    initLoad()
  }
)
function initLoad() {
  // 基于准备好的dom，初始化echarts实例
  // var myChart = echarts.init(main.value);
  // var myChart = echarts.init(document.getElementById('main'));
  var myChart = echarts.init(document.getElementById("main2"));
  // 注册可用的地图
  echarts.registerMap('china', chinaJson);
  // 指定图表的配置项和数据
  var option = {
    title: {
      text: '中国地图'
    },
    series: [
      {
        type: 'map',
        map: 'china',
        // 显示标签样式
        label: {
          show: true,
          fontSize: 10,
          color: 'white',
        },
        // 图形样式
        itemStyle: {
          areaColor: 'blue',
          borderColor: 'white',
          borderWidth: '1',
        },
        layoutCenter: ['60%', '72%'],//位置
	      layoutSize:550,//大小
        // 添加数据，注意应与显示的标签名一致
        data: [
          { name: '重庆市', value: 2005 },
          { name: '天津市', value: 1547 },
          { name: '上海市', value: 3168 },
          { name: '北京市', value: 6992 },
          { name: '四川省', value: 4200 },
          { name: '湖北省', value: 9500 },
        ],
      }
    ],
    visualMap: {
      min: 1000,
      max: 10000,
      text: ['High', 'Low'],
      realtime: false,
      calculable: true,
      inRange: {
        color: ['lightskyblue', 'yellow', 'orangered']
      }
    },
  };
  myChart.setOption(option);
}
</script>

<template>
  <div class="echarts">
    <div ref="main" id="main2" style="width: 1200px; height: 400px"></div>
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
