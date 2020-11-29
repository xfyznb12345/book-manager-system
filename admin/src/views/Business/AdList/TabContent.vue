<template>
  <el-row>
    <el-col :span="12" class="image">
      <div class="title">
        广告封面
      </div>
      <div class="imageInfo">
        <el-image
          v-if="imageUrl"
          :src="imageUrl"
          :preview-src-list="imageUrlBig"
        />
        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
      </div>
      <el-upload
        class="uploadImage"
        action="#"
        :auto-upload="false"
        :show-file-list="false"
        :on-change="handleChange"
        v-if="isEdit"
      >
        <el-button round type="primary"
          ><i class="el-icon-upload"></i>点击上传</el-button
        >
        <div slot="tip" class="el-upload__tip">
          只能上传jpg/png文件，且不超过2M
        </div>
      </el-upload>
    </el-col>
    <el-col :span="12" class="form">
      <el-form
        label-position="left"
        label-width="110px"
        :model="ruleForm"
        :rules="rules"
        ref="ruleForm"
        class="ruleForm"
      >
        <el-form-item label="标题:" prop="title">
          <div v-if="!isEdit">{{ tabContent.title }}</div>
          <el-input v-else v-model="ruleForm.title"></el-input>
        </el-form-item>
        <el-form-item label="关联图书:" prop="book">
          <div v-if="!isEdit">{{ tabContent.book.title }}</div>
          <el-select
            v-else
            v-model="ruleForm.book"
            filterable
            remote
            reserve-keyword
            placeholder="请输入关键词"
            :remote-method="remoteMethod"
            :loading="loading"
            v-el-select-scroll="loadmore"
          >
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="是否启用:">
          <el-switch
            v-if="!isEdit"
            :disabled="!isEdit"
            v-model="tabContent.state"
            :active-value="0"
            :inactive-value="1"
            active-color="#13ce66"
            inactive-color="#ff4949"
          >
          </el-switch>
          <el-switch
            v-else
            v-model="ruleForm.state"
            :active-value="0"
            :inactive-value="1"
            active-color="#13ce66"
            inactive-color="#ff4949"
          >
          </el-switch>
        </el-form-item>
        <el-form-item label="备注:">
          <div v-if="!isEdit">{{ tabContent.remark }}</div>
          <el-input
            type="textarea"
            :rows="3"
            v-else
            v-model="ruleForm.remark"
          ></el-input>
        </el-form-item>
        <el-form-item class="optionForm">
          <el-button round v-if="!isEdit" type="primary" @click="initEdit"
            ><i class="el-icon-edit"></i>编辑</el-button
          >
          <div v-else>
            <el-button round type="success" @click="submitForm('ruleForm')"
              >保存</el-button
            >
            <el-button round type="info" @click="cancleEdit">取消</el-button>
            <!-- 删除 -->
            <el-popover
              placement="top"
              width="160"
              v-model="visible"
              style="margin-left:10px"
            >
              <p>确认删除吗？</p>
              <div style="text-align: right; margin: 0">
                <el-button size="mini" type="text" @click="visible = false"
                  >取消</el-button
                >
                <el-button type="primary" size="mini" @click="AdDelete"
                  >确定</el-button
                >
              </div>
              <el-button round type="danger" slot="reference" v-if="!isNew"
                >删除</el-button
              >
            </el-popover>
          </div>
        </el-form-item>
      </el-form>
    </el-col>
    <Cropper
      :showDialog="showDialog"
      :imgUrl="imgUrl"
      @close="closeDialog"
    ></Cropper>
  </el-row>
</template>

<script>
import {
  api_AdAdd,
  api_AdDelete,
  api_AdEdit,
  api_bookAdList,
  iconUrl,
} from '../../../api/api'
import Cropper from './Cropper'
const lodash = require('lodash')
export default {
  props: {
    tabContent: Object,
    isNew: Boolean,
  },
  watch: {
    tabContent: {
      handler() {
        if (this.isNew) {
          this.isEdit = true
        } else {
          this.isEdit = false
          this.imageUrl = this.iconUrl + this.tabContent.image
        }
      },
      immediate: true,
    },
  },
  components: {
    Cropper,
  },
  data() {
    return {
      iconUrl: iconUrl, //地址
      imageUrl: '', //小图
      imageUrlBig: [], //大图
      imageFile: '', //文件流
      isEdit: false,
      ruleForm: {
        state: 0,
      },
      rules: {
        title: [{ required: true, message: '请输入标题', trigger: 'blur' }],
        book: [{ required: true, message: '请关联图书', trigger: 'blur' }],
      },
      showDialog: false, //裁剪窗口
      imgUrl: '', //传入的image地址
      loading: false, //是否为搜索状态
      options: [], //远程搜索列表
      visible: false,
    }
  },
  methods: {
    //上传图片
    handleChange(e) {
      // 创建一个读取异步文件的对象
      const reader = new FileReader()
      /* 
        将要读的文件对象传入readAsDataURL方法中 该方法会会在读取完毕会返回
        一个data: URL格式的Base64字符串
      */
      reader.readAsDataURL(e.raw)
      reader.onload = (e) => {
        // e.target.result 就是文件读取后的结果
        // 而这里拿到的imgURL就可以传给vue-cropper中的img参数了
        this.imgUrl = e.target.result
        this.showDialog = true
      }
    },
    //裁剪完毕
    closeDialog(file) {
      if (file) {
        const reader = new FileReader()
        reader.readAsDataURL(file)
        reader.onload = () => {
          this.ruleForm.image = file //发送给后端的图片
          this.imageUrl = reader.result //展示的小图
          this.imageUrlBig = [reader.result] //点击可看大图
        }
      }
      this.showDialog = false
    },
    //初始化编辑
    initEdit() {
      this.ruleForm = JSON.parse(JSON.stringify(this.tabContent)) //深拷贝
      //对图书进行处理
      this.options = [
        {
          value: this.ruleForm.book._id,
          label: this.ruleForm.book.title,
        },
      ]
      this.ruleForm.book = this.options[0].value
      //打开编辑开关
      this.isEdit = true
    },
    //保存
    submitForm(formName) {
      if (!this.ruleForm.image) {
        this.$message.warning('请上传图片')
        return
      }
      this.$refs[formName].validate((valid) => {
        if (valid) {
          const formData = new FormData()
          this.ruleForm._id && formData.append('_id', this.ruleForm._id)
          this.ruleForm.title && formData.append('title', this.ruleForm.title)
          this.ruleForm.book && formData.append('book', this.ruleForm.book)
          formData.append('state', this.ruleForm.state)
          this.ruleForm.remark &&
            formData.append('remark', this.ruleForm.remark)
          this.ruleForm.image && formData.append('image', this.ruleForm.image)
          console.log(this.ruleForm.state)
          // Object.keys(this.ruleForm).map(key=>{
          //   formData.append(key,this.ruleForm[key])
          // })
          if (this.isNew) {
            //新建
            api_AdAdd(formData).then(() => {
              this.$emit('replace')
              this.$message.success('新建成功')
              this.isEdit = false
            })
          } else {
            //编辑
            api_AdEdit(formData)
              .then(() => {
                this.$emit('replace')
                this.$message.success('修改成功')
                this.isEdit = false
              })
              .catch((err) => {
                console.log(err)
              })
          }
        } else {
          return false
        }
      })
    },
    //取消编辑
    cancleEdit() {
      if (this.isNew) {
        this.$emit('cancleNewTab') //如果新页面取消则需要加新tab删除
      }
      this.isEdit = false
    },
    //删除广告
    AdDelete() {
      api_AdDelete(this.ruleForm._id).then(() => {
        this.$message.success('删除成功')
        this.isEdit = false
        this.$emit('deleteAd')
      })
    },
    //远程搜索
    remoteMethod(query) {
      this.options = []
      this.pageNum = 1
      this.keyWords = query
      if (query !== '') {
        this.loading = true
        this.serchBook(this.keyWords, this.pageNum, 10)
      } else {
        this.options = []
      }
    },
    //滚动刷新
    loadmore() {
      this.pageNum++
      this.serchBook(this.keyWords, this.pageNum, 10)
    },
    //搜索
    serchBook: lodash.debounce(function(query, pageNum, pageSize) {
      const req = {
        keyWords: query,
        pageNum,
        pageSize,
      }
      api_bookAdList(req).then((res) => {
        setTimeout(() => {
          this.loading && (this.loading = false)
          const list = res.map((item) => {
            return { value: item._id, label: item.title }
          })
          this.options.push(...list)
        }, 200)
      })
    }, 500),
  },
}
</script>

<style lang="scss" scoped>
.el-row ::v-deep {
  height: 100%;
  width: 100%;
  .image {
    height: 100%;

    .title {
      background: #eee
        url(data:image/gif;base64,iVBORw0KGgoAAAANSUhEUgAAAAQAAAAECAIAAAAmkwkpAAAAHklEQVQImWNkYGBgYGD4//8/A5wF5SBYyAr+//8PAPOCFO0Q2zq7AAAAAElFTkSuQmCC)
        repeat;
      text-shadow: 5px -5px black, 4px -4px white;
      font-weight: bold;
      -webkit-text-fill-color: transparent;
      -webkit-background-clip: text;
      font-size: 30px;
      text-align: center;
      height: 100px;
      line-height: 100px;
    }
    .imageInfo {
      text-align: center;
      .el-image {
        width: 90%;
        height: 360px;
      }
    }
    .el-icon-plus {
      border: 1px dashed #d9d9d9;
      border-radius: 6px;
      cursor: pointer;
      position: relative;
      overflow: hidden;
      font-size: 28px;
      color: #8c939d;
      width: 640px;
      height: 360px;
      line-height: 360px;
      text-align: center;
    }
    .uploadImage {
      position: absolute;
      bottom: 100px;
      left: 25%;
      transform: translate(-25%);
    }
  }
  .form {
    height: 100%;
    padding-left: 50px;
    .ruleForm {
      padding-top: 100px;
    }
    .optionForm {
      position: absolute;
      bottom: 70px;
    }
    .el-form-item {
      margin-bottom: 50px;
    }
    .el-form-item__label {
      font-weight: 500;
      font-size: 18px;
    }
    .el-form-item__content {
      font-size: 16px;
    }
    .el-input__inner {
      width: 450px;
    }
    .el-textarea__inner {
      width: 450px;
    }
  }
}
</style>
