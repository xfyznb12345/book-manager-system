<template>
  <el-dialog title="图片剪裁" :visible.sync="dialogVisible" append-to-body>
    <div class="cropper-content">
      <div class="cropper" style="text-align:center">
        <vueCropper
          ref="cropper"
          :img="option.img"
          :outputSize="option.outputSize"
          :outputType="option.outputType"
          :info="option.info"
          :canScale="option.canScale"
          :autoCrop="option.autoCrop"
          :autoCropWidth="option.autoCropWidth"
          :autoCropHeight="option.autoCropHeight"
          :fixed="option.fixed"
          :fixedBox="option.fixedBox"
          :fixedNumber="option.fixedNumber"
        ></vueCropper>
      </div>
    </div>
    <div slot="footer" class="dialog-footer">
      <el-button @click="dialogVisible = false">取 消</el-button>
      <el-button type="primary" @click="finish" :loading="loading"
        >确认</el-button
      >
    </div>
  </el-dialog>
</template>
<script>
import { VueCropper } from 'vue-cropper'
export default {
  components: {
    VueCropper
  },
  data () {
    return {
      imageUrl: '',
      dialogVisible: false,
      // 裁剪组件的基础配置option
      option: {
        img: '', // 裁剪图片的地址
        info: true, // 裁剪框的大小信息
        outputSize: 0.8, // 裁剪生成图片的质量
        outputType: 'jpeg', // 裁剪生成图片的格式
        canScale: false, // 图片是否允许滚轮缩放
        autoCrop: true, // 是否默认生成截图框
        autoCropWidth: 100, // 默认生成截图框宽度
        autoCropHeight: 100, // 默认生成截图框高度
        fixedBox: true, // 固定截图框大小 不允许改变
        fixed: true, // 是否开启截图框宽高固定比例
        fixedNumber: [1, 1], // 截图框的宽高比例
        full: true, // 是否输出原图比例的截图
        canMoveBox: false, // 截图框能否拖动
        original: false, // 上传图片按照原始比例渲染
        centerBox: false, // 截图框是否被限制在图片里面
        infoTrue: true, // true 为展示真实输出图片宽高 false 展示看到的截图框宽高
        canMove: true
      },
      picsList: [], // 页面显示的数组
      // 防止重复提交
      loading: false,
      fileinfo: {}
    }
  },
  methods: {
    // handleAvatarSuccess(res, file, fileList) {
    //   //上传成功后将图片地址赋值给裁剪框显示图片
    //   this.$nextTick(() => {
    //     this.option.img = URL.createObjectURL(file.raw)
    //     this.fileinfo = res
    //     this.dialogVisible = true
    //   })
    // },
    // beforeAvatarUpload(file) {
    //   const isJPG = file.type === 'image/jpeg' || file.type === 'image/png'
    //   const isLt2M = file.size / 1024 / 1024 < 2

    //   if (!isJPG) {
    //     this.$message.error('上传头像图片只能是 JPG 格式!')
    //   }
    //   if (!isLt2M) {
    //     this.$message.error('上传头像图片大小不能超过 2MB!')
    //   }
    //   return isJPG && isLt2M
    // },
    // finish() {
    //   this.$refs.cropper.getCropBlob((data) => {
    //     var fileName = 'goods' + this.fileinfo.uid
    //     this.loading = true
    //     //上传阿里云服务器
    //     //请求
    //   })
    // },
  }
}
</script>
<style scoped>
.avatar-uploader {
  background: red !important;
  width: 150px;
  height: 150px;
  text-align: center;
  line-height: 150px;
}
.el-icon-plus {
  width: 150px;
  height: 150px;
  font-size: 30px;
}
.cropper-content {
  width: 500px;
  height: 500px;
  background: pink;
}
.cropper {
  width: 500px;
  height: 500px;
  background: yellow;
}
</style>
