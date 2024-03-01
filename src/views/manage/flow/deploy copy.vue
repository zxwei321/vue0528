<script setup>
import { reactive, ref } from "vue";
import QrcodeVue from "@chenfengyuan/vue-qrcode";

const dialogVisible = ref(false);
const qrCode123 = ref("https://www.baidu.com");

</script>

<template>
  <div class="page">

<figure class="qrcode">
   <qrcode-vue
      value="https://github.com/fengyuanchen"
      tag="svg"
      :options="{
        width: 150,
      }"
    ></qrcode-vue>
    <img
      class="qrcode__image"
      src="https://avatars.githubusercontent.com/u/3456749"
      alt="Chen Fengyuan"
    />
  </figure>



      <!-- <qrcode-vue
        :value="qrCode123"
        :options="{
          color: {
            dark: '#0074d9',
            light: '#7fdbff',
          },
        }"
      ></qrcode-vue> -->
  </div>
</template>

<style scoped>
.qrcode {
  display: inline-block;
  font-size: 0;
  margin-bottom: 0;
  position: relative;
}

.qrcode__image {
  background-color: #fff;
  border: 0.25rem solid #fff;
  border-radius: 0.25rem;
  box-shadow: 0 0.125rem 0.25rem rgba(0, 0, 0, 0.25);
  height: 15%;
  left: 50%;
  overflow: hidden;
  position: absolute;
  top: 50%;
  transform: translate(-50%, -50%);
  width: 15%;
}
</style>
