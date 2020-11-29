<template>
  <el-dialog
    :visible.sync="showDialog"
    width="30%"
    :show-close="false"
    :close-on-click-modal="false"
  >
    <!-- 头部 -->
    <span slot="title" class="dialog-title">
      <i class="el-icon-warning-outline"></i>
      重置密码
    </span>
    <!-- 内容 -->
    <Form :formLabel="formLabel" :form="form"></Form>
    <!-- 底部 -->
    <span slot="footer" class="dialog-footer">
      <el-button @click="handleClose">取 消</el-button>
      <el-button type="primary" @click="handleEdit">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
import Form from '../../../components/Form'
export default {
  props: {
    showDialog: Boolean,
  },
  components:{
    Form
  },
  data(){
    return{
      form:{
        oldPassWord:'',
        newPassWord:''
      },
      formLabel:[
        {
          model:'oldPassWord',
          label:'原始密码',
          point:"原始密码"
        },
        {
          model:'newPassWord',
          label:'新密码',
          point:"由大小写英文字母、数字、' _ ' 组成，长度不超过20个字"
        },
      ]
    }
  },
  methods:{
    handleEdit(){
      this.$message.warning('功能未开发')
      this.handleClose()
    },
    handleClose(){
      this.$emit('close')
    }
  }
}
</script>

<style lang="scss" scoped></style>
