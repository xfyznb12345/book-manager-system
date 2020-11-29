<template>
  <el-dialog
    :visible.sync="showDialog"
    width="30%"
    :show-close="false"
    :close-on-click-modal="false"
    @open="openDialog"
  >
    <!-- 头部 -->
    <span slot="title" class="dialog-title">
      <i class="el-icon-warning-outline"></i>
      批量关联
    </span>
    <!-- 内容 -->
    <el-radio-group v-model="radio" class="radio-content">
      <el-radio
        v-for="item in label"
        :label="item._id"
        :key="item._id"
        style="display:block"
        class="radioWe"
        >{{ item.code + item.name }}</el-radio
      >
    </el-radio-group>
    <!-- 底部 -->
    <span slot="footer" class="dialog-footer">
      <el-button @click="handleClose">取 消</el-button>
      <el-button type="primary" @click="submitForm">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
import { api_categoryAss } from '../../../api/api'
export default {
  props: {
    showDialog: Boolean,
    type: Boolean,
    form: Object,
    checkList: Array,
    label:Array
  },
  watch: {
    form() {
      this.ruleForm = this.form
    },
  },
  data() {
    return {
      // label: [],
      radio: [],
    }
  },
  methods: {
    async submitForm() {
      const req = {
        list: this.checkList,
        code: this.radio,
      }
      const res = await api_categoryAss(req).catch((err) =>
        this.$message.error(err.msg)
      )
      if (res) {
        this.$message.success('批量关联成功')
        this.handleClose()
      }
    },
    handleClose() {
      this.$emit('close')
    },
    // openDialog() {
    //   api_categoryMany()
    //     .then((res) => {
    //       this.label = res
    //     })
    //     .catch((err) => {
    //       this.$message.error(err.msg)
    //     })
    // },
  },
}
</script>

<style lang="scss" scoped>
.el-dialog {
  .radio-content {
    ::v-deep .el-radio {
      margin-left: 30px;
      font-size: 20px;
      .el-radio__label{
        margin-left: 10px;
      }
    }
  }
}
</style>
