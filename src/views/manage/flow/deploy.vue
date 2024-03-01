<script setup>
import { reactive, ref } from "vue";
import Qrcode from "qrcode";

const text = ref("");

const qrImage = ref("");

const makeQrCode = async () => {
  await Qrcode.toDataURL(text.value, {
    type: "image/png", //类型
    quality: 0.5, //图片质量A Number between 0 and 1
    width: 130, //高度
    height: 130, //宽度
    errorCorrectionLevel: "L", //容错率
    margin: 1, //外边距
    color: {
      dark: "#000000", //前景色
      light: "#ffffff", //背景色
    },
  })
    .then((url) => {
      qrImage.value = url;
    })
    .catch((err) => {
      console.error(err);
    });
};

const onQrcode = () => {
  makeQrCode();
};
</script>

<template>
  <div class="page">
    <input type="text" v-model="text" />
    <el-button @click="onQrcode">添加</el-button>
    <img :src="qrImage" alt="" />
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
