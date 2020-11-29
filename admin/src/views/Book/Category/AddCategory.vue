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
      {{ !type ? '新建图书分类' : '编辑图书分类' }}
    </span>
    <!-- 内容 -->
    <el-form
      :model="ruleForm"
      :rules="rules"
      ref="ruleForm"
      label-width="100px"
      class="demo-ruleForm"
    >
      <el-form-item label="分类名称" prop="name">
        <el-input v-model="ruleForm.name"></el-input>
      </el-form-item>
      <el-form-item label="关键词" prop="keyWords">
        <div class="keyWords">
          <el-input v-model="inputValue"></el-input>
          <el-button @click="addTag">+ 添 加</el-button>
        </div>
        <el-tag
          :key="tag"
          v-for="tag in ruleForm.keyWords"
          closable
          :disable-transitions="false"
          @close="closeTag(tag)"
        >
          {{ tag }}
        </el-tag>
      </el-form-item>
      <el-form-item label="是否启用">
        <el-radio-group v-model="ruleForm.status">
          <el-radio :label="true">是</el-radio>
          <el-radio :label="false">否</el-radio>
        </el-radio-group>
      </el-form-item>
      <!-- 上传轮播图片 -->
      <!-- <el-form-item label="分类轮播图">
        <el-upload
          class="avatar-uploader"
          :action="upload"
          :show-file-list="false"
          :on-success="(res) => $set(ruleForm, 'icon', res.url)"
        >
          <img v-if="ruleForm.icon" :src="ruleForm.icon" class="avatar" />
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          <div slot="tip" class="el-upload__tip">
            <p><span style="color:#F5222D;">*</span>支持：.jpg .png .gif格式 </p>
            <p>建议比例：16:9，小于10M</p>
          </div>
        </el-upload>
      </el-form-item> -->
      <el-form-item label="分类描述" prop="remarks">
        <el-input v-model="ruleForm.remarks" type="textarea"></el-input>
      </el-form-item>
    </el-form>
    <!-- 底部 -->
    <span slot="footer" class="dialog-footer">
      <el-button @click="handleClose('ruleForm')">取 消</el-button>
      <el-button type="primary" @click="submitForm('ruleForm')"
        >确 定</el-button
      >
    </span>
  </el-dialog>
</template>

<script>
import { api_categoryAdd, api_categoryEdit, upload } from '../../../api/api'
export default {
  props: {
    showDialog: Boolean,
    type: Boolean,
    form: Object,
  },
  watch: {
    form() {
      this.ruleForm = this.form
    },
  },
  data() {
    return {
      ruleForm: {
        name: '',
        keyWords: [],
        status: true,
        icon: '',
        remarks: '',
      },
      rules: {
        name: [
          { required: true, message: '请输入分类名称', trigger: 'blur' },
          { min: 2, max: 7, message: '长度在 3 到 7 个字符', trigger: 'blur' },
        ],
      },
      inputValue: '', //新增的tag标签
      upload: upload,
    }
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          if (this.type) {
            //编辑
            api_categoryEdit(this.ruleForm._id, this.ruleForm).then((res) => {
              if (res.message === 'success') this.$message.success('修改成功')
              this.handleClose(formName)
            })
          } else {
            //新增
            api_categoryAdd(this.ruleForm).then((res) => {
              if (res.message === 'success') this.$message.success('新建成功')
              this.handleClose(formName)
            })
          }
        } else {
          return false
        }
      })
    },
    handleClose(formName) {
      this.$refs[formName].resetFields()
      this.$emit('close')
    },
    //添加tag
    addTag() {
      if (this.inputValue) {
        this.ruleForm.keyWords.push(this.inputValue)
      }
      this.inputValue = '' //清空
    },
    //删除tag
    closeTag(tag) {
      this.ruleForm.keyWords.splice(this.ruleForm.keyWords.indexOf(tag), 1)
    },
  },
}
</script>

<style lang="scss" scoped>
.el-dialog {
  .demo-ruleForm {
    .keyWords {
      display: flex;
      justify-content: space-between;
      .el-input {
        width: 300px;
      }
    }
  }
  .avatar-uploader .el-upload {
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader {
    display: flex;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409eff;
  }
  .avatar-uploader-icon {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 100px;
    line-height: 100px;
    text-align: center;
  }
  .el-upload__tip {
    margin: 15px;
    p {
      font-size: 13px;
      font-weight: 500;
      line-height: 1.5rem;
      color: #8c939d;
    }
  }
  .avatar {
    width: 178px;
    height: 100px;
    display: block;
  }
}
</style>
