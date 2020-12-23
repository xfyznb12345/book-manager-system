<template>
  <el-dialog
    :visible.sync="showDialog"
    width="30%"
    :show-close="false"
    @open="openDialog"
    :close-on-click-modal="false"
  >
    <!-- 头部 -->
    <span slot="title" class="dialog-title">
      <i class="el-icon-warning-outline"></i>
      {{!editForm._id ? '新增':'编辑'}}
    </span>
    <!-- 内容 -->
    <Form :formLabel="formLabel" :form="form"></Form>
    <!-- 底部 -->
    <span slot="footer" class="dialog-footer">
      <el-button @click="handleClose">取 消</el-button>
      <el-button type="primary" @click="roleEdit">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
import Form from '@/components/Form'
import { api_rolesList, api_usersAdd, api_usersEdit } from '../../../api/api'
export default {
  props: {
    showDialog: Boolean,
    editForm: Object
  },
  components: {
    Form
  },
  data () {
    return {
      form: {
        userName: '',
        passWord: '',
        nickName: '',
        role: '',
        phone: '',
        email: ''
      },
      formLabel: [],
      formLabel1: [
        {
          model: 'userName',
          label: '用户名',
          point: '长度5~20个字符',
          style: 'width:380px'
        },
        {
          model: 'nickName',
          label: '姓名',
          point: '长度不超过50个字符',
          style: 'width:380px'
        },
        {
          model: 'passWord',
          point: "由大小写英文字母、数字、' _ ' 组成，长度不超过20个字",
          label: '密码',
          style: 'width:380px'
        },
        {
          model: 'role',
          label: '角色',
          point: '角色',
          type: 'select',
          style: 'width:380px',
          opts: []
        },
        {
          model: 'phone',
          label: '手机号',
          point: '手机号',
          style: 'width:380px'
        },
        {
          model: 'email',
          label: '邮箱',
          point: '邮箱',
          style: 'width:380px'
        }
      ],
      formLabel2: [
        {
          model: 'userName',
          label: '用户名',
          point: '长度5~20个字符',
          style: 'width:380px'
        },
        {
          model: 'nickName',
          label: '姓名',
          point: '长度不超过50个字符',
          style: 'width:380px'
        },
        {
          model: 'role',
          label: '角色',
          point: '角色',
          type: 'select',
          style: 'width:380px',
          opts: []
        },
        {
          model: 'phone',
          label: '手机号',
          point: '手机号',
          style: 'width:380px'
        },
        {
          model: 'email',
          label: '邮箱',
          point: '邮箱',
          style: 'width:380px'
        }
      ]
    }
  },
  methods: {
    async roleEdit () {
      if (this.editForm._id) {
        const res = await api_usersEdit(this.form).catch((err) => {
          this.$message.error(err.msg)
        })
        if (res) {
          this.$message.success('修改成功')
          this.handleClose()
        }
      } else {
        const res = await api_usersAdd(this.form).catch((err) => {
          this.$message.error(err.msg)
        })
        if (res) {
          this.$message.success('新增成功')
          this.handleClose()
        }
      }
    },
    handleClose () {
      this.form = {}
      this.$emit('close')
    },
    openDialog () {
      if (this.editForm._id) this.formLabel = this.formLabel2
      else this.formLabel = this.formLabel1
      const req = {
        noHigh: true
      }
      api_rolesList(req)
        .then((res) => {
          const arr = []
          res.forEach((val) => {
            const n = {
              value: val._id,
              label: val.roleName
            }
            arr.push(n)
          })
          if (this.editForm._id) {
            this.formLabel[2].opts = arr
            this.form = this.editForm
          } else this.formLabel[3].opts = arr
        })
        .catch((err) => {
          this.$message.error(err.msg)
        })
    }
  }
}
</script>

<style lang="scss" scoped></style>
