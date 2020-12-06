<template>
  <el-dialog
    title="图片剪裁"
    :visible.sync="showDialog"
    append-to-body
    @open="openDialog"
  >
    <div class="cropper-content">
      <div class="cropper">
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
      <el-button @click="handleCancel">取 消</el-button>
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
  props: {
    showDialog: Boolean,
    imgUrl: String
  },
  data () {
    return {
      // 裁剪组件的基础配置option
      option: {
        img: '', // 裁剪图片的地址
        info: true, // 裁剪框的大小信息
        outputSize: 0.8, // 裁剪生成图片的质量
        outputType: 'jpeg', // 裁剪生成图片的格式
        canScale: false, // 图片是否允许滚轮缩放
        autoCrop: true, // 是否默认生成截图框
        autoCropWidth: 480, // 默认生成截图框宽度
        autoCropHeight: 270, // 默认生成截图框高度
        fixedBox: false, // 固定截图框大小 不允许改变
        fixed: true, // 是否开启截图框宽高固定比例
        fixedNumber: [23, 10], // 截图框的宽高比例
        full: false, // 是否输出原图比例的截图
        canMoveBox: false, // 截图框能否拖动
        original: false, // 上传图片按照原始比例渲染
        centerBox: false, // 截图框是否被限制在图片里面
        infoTrue: true, // true 为展示真实输出图片宽高 false 展示看到的截图框宽高
        canMove: true
      },
      // 防止重复提交
      loading: false
    }
  },
  methods: {
    // 初始化
    openDialog () {
      this.option.img = this.imgUrl
    },
    finish () {
      this.$refs.cropper.getCropBlob((data) => {
        // 获取截图的blob数据
        const aTime = new Date().getTime() // 取时间戳，给文件命名
        const fileName = aTime + '.' + data.type.substr(6) // 给文件名加后缀
        const file = new window.File([data], fileName, { type: data.type }) // blob转file
        this.$emit('close', file)
      })
    },
    handleCancel () {
      this.$emit('close')
    }
  }
}
</script>

<style lang="scss" scoped>
.cropper-content {
  .cropper {
    width: auto;
    height: 500px;
    .cropper-box-canvas {
      .img {
        height: 100%;
      }
    }
  }
}
</style>
