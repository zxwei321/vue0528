<script setup>
import { reactive, ref } from "vue";
import Qrcode from "qrcode";
import { ElMessage } from "element-plus";
import { UploadFilled } from "@element-plus/icons-vue";
import { add, update } from "../../../../api/goods";
import { list } from "../../../../api/category";
import goodUpload from "./goodUpload.vue";
import goodsWangEditor from "./goodsWangEditor.vue";
const dialogFormVisible = ref(false);
const formLabelWidth = "100px";
const initForm = () => ({
  title: "",
  price: "",
  num: 0,
  category: "",
  sellPoint: "",
  image: "",
  qrcodeUrl: "",
  qrcodeImg: "",
  releaseTime: "",
  description: "",
});

const defaultImg = ref(
  "https://cube.elemecdn.com/e/fd/0fc7d20532fdaf769a25683617711png.png"
);
const form = reactive(initForm());

const dialogTitle = ref();

const emit = defineEmits(["on-submit"]);
const createAdd = ref(false);
const dialogShow = (row) => {
  Object.assign(form, initForm());
  if (row) {
    dialogTitle.value = "编辑";
    createAdd.value = false;
    Object.assign(form, { ...row });
  } else {
    dialogTitle.value = "新增";
    createAdd.value = true;
  }
  categoryList();
  dialogFormVisible.value = true;
};
//提交相关数据
const onSave = async () => {
  if (createAdd.value) {
    const res = await add(form);
    ElMessage({
      showClose: true,
      message: "添加成功",
      type: "success",
    });
  } else {
    const res = await update(form);
    ElMessage({
      showClose: true,
      message: "修改成功",
      type: "success",
    });
  }
  emit("on-submit");
  dialogFormVisible.value = false;
};

const uploadImg = ref();
const postImg = (urlImg) => {
  console.log(urlImg, "urlImg");
  form.image = urlImg;
};

const postValueHtml = (data) => {
  form.description = data;
};

//获取商品类别
const categoryData = ref([]);
const categoryList = async () => {
  const res = await list(1, 20);
  console.log(res.data.data.data, "categoryList");
  categoryData.value = res.data.data.data;
};

// 二维码

const makeQrCode = async () => {
  await Qrcode.toDataURL(form.qrcodeUrl, {
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
      form.qrcodeImg = url;
    })
    .catch((err) => {
      console.error(err);
    });
};

const makeQrCodeClear = () => {
  Qrcode.clear(); // clear the code.
};

defineExpose({
  dialogShow,
});
</script>

<template>
  <el-dialog v-model="dialogFormVisible" :title="dialogTitle + '信息'">
    <el-form :model="form">
      <el-form-item label="商品名称" :label-width="formLabelWidth">
        <el-input v-model="form.title" autocomplete="off" />
      </el-form-item>
      <el-form-item label="商品价格" :label-width="formLabelWidth">
        <el-input v-model="form.price" autocomplete="off" />
      </el-form-item>

      <el-form-item label="商品卖点" :label-width="formLabelWidth">
        <el-input v-model="form.sellPoint" autocomplete="off" />
      </el-form-item>
      <el-form-item label="规格类目" :label-width="formLabelWidth">
        <el-select v-model="form.category" placeholder="请选择商品类型">
          <el-option v-for="item in categoryData" :key="item.id" :label="item.title" :value="item.title" />
        </el-select>
      </el-form-item>
      <el-row>
        <el-col :span="12"
          ><el-form-item label="商品数量" :label-width="formLabelWidth">
            <el-input-number
              v-model="form.num"
              :precision="2"
              :step="10"
              :max="1000"
              style="width: 100%"
            /> </el-form-item
        ></el-col>
        <el-col :span="12">
          <el-form-item label="发布时间" :label-width="formLabelWidth">
            <el-date-picker
              v-model="form.releaseTime"
              type="date"
              placeholder="请选择发布日期"
              style="width: 100%"
            /> </el-form-item
        ></el-col>
      </el-row>

      <el-form-item label="商品图片" :label-width="formLabelWidth">
        <el-image
          style="width: 100px; height: 100px"
          :src="form.image ? form.image : defaultImg"
        >
        </el-image>
        <el-button type="primary" class="ml10" @click="uploadImg.imgShow()"
          >上传图片</el-button
        >
      </el-form-item>

      <el-form-item label="二维码" :label-width="formLabelWidth">
        <el-image
          :src="form.qrcodeImg ? form.qrcodeImg : defaultImg"
          style="width: 100px; height: 100px"
        >
        </el-image>
        <el-input
          class="ml10"
          v-model="form.qrcodeUrl"
          autocomplete="off"
          style="width: 50%"
        />
        <el-button type="primary" class="ml10 mr10" @click="makeQrCode"
          >生成二维码</el-button
        >
        <!-- <el-button type="primary" class="ml10 mr10" @click="makeQrCodeClear"
          >取消二维码</el-button
        > -->
      </el-form-item>

      <el-form-item label="商品描述" :label-width="formLabelWidth">
        <goodsWangEditor @postValueHtml="postValueHtml" />
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取消</el-button>
        <el-button type="primary" @click="onSave"> 提交 </el-button>
      </span>
    </template>
  </el-dialog>
  <goodUpload ref="uploadImg" @postImg="postImg" />
</template>

<style scoped>
.text-center {
  text-align: center;
}
</style>
