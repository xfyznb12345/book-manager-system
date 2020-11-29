<template>
  <header>
    <div class="title"><img :src="img" class="pic" />图书后台管理系统</div>
    <el-dropdown @command="handleCommand">
      <el-avatar class="avatarIcon"
        :src="iconUrl + userInfo.icon"
      ></el-avatar>
      <span class="name">{{ userInfo.nickName || '管理员' }}</span>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item icon="el-icon-user" command="personInfo"
          >个人信息</el-dropdown-item
        >
        <el-dropdown-item icon="el-icon-unlock" command="b"
          >修改密码</el-dropdown-item
        >
        <el-dropdown-item icon="el-icon-circle-close" command="loginOut"
          >退出登录</el-dropdown-item
        >
      </el-dropdown-menu>
    </el-dropdown>
    <!-- 个人中心 -->
    <el-dialog
      :visible.sync="showDialog"
      width="738px"
      :show-close="false"
      :close-on-click-modal="false"
      @open="openDialog"
    >
      <!-- 头部 -->
      <span slot="title" class="dialog-title">
        <i class="el-icon-warning-outline"></i>
        个人中心
      </span>
      <!-- 内容 -->
      <div class="content">
        <div class="pic">
          <el-upload
            action="#"
            class="avatar-uploader"
            :show-file-list="false"
            :auto-upload="false"
            :on-change="handleChange"
          >
            <img  v-if="imageUrl" :src="imageUrl" class="avatar" />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </div>
        <div class="info">
          <el-row>
            <el-col :span="4">用户名：</el-col>
            <el-col :span="18">{{ userInfo.userName || '' }}</el-col>
          </el-row>
          <el-row>
            <el-col :span="4">角色：</el-col>
            <el-col :span="18">{{ userInfo.role || '' }}</el-col>
          </el-row>
          <el-row>
            <el-col :span="4">电话：</el-col>
            <el-col :span="18">
              <el-input v-model="phone"></el-input>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="4">邮箱：</el-col>
            <el-col :span="18">
              <el-input v-model="email"></el-input>
            </el-col>
          </el-row>
        </div>
      </div>
      <!-- 底部 -->
      <span slot="footer" class="dialog-footer">
        <el-button @click="handleClose">取 消</el-button>
        <el-button type="primary" @click="userEdit">保 存</el-button>
      </span>
    </el-dialog>
  </header>
</template>

<script>
import { mapState } from 'vuex'
import { api_avatarUpload, api_userInfo, api_usersEdit, iconUrl } from '../api/api'
export default {
  computed: {
    ...mapState(['userInfo']),

  },
  data() {
    return {
      img: require('../assets/images/topHeaderLogo.png'),
      showDialog: false,
      uploadAvatar: api_avatarUpload,
      imageUrl: '',
      imageIcon:'',
      phone:'',
      email:'',
      iconUrl:iconUrl
    }
  },
  methods: {
    handleCommand(command) {
      if (command === 'loginOut') {
        window.localStorage.clear()
        this.$router.push('/login')
      } else if (command === 'personInfo') {
        this.showDialog = true
      }
    },
    handleChange(file) {
      const reader = new FileReader()
      reader.readAsDataURL(file.raw)
      reader.onload = () => {
        this.imageIcon = file.raw
        this.imageUrl = reader.result
      }
    },
    openDialog(){
      this.phone = this.userInfo.phone
      this.email = this.userInfo.email
      if(this.userInfo.icon){
        this.imageUrl = this.iconUrl + this.userInfo.icon
      }
    },
    async userEdit() {
      const formData = new FormData()
      formData.append('_id',this.userInfo._id)
      formData.append('icon',this.imageIcon)
      formData.append('phone',this.phone)
      formData.append('email',this.email)
      const res = await api_usersEdit(formData).catch(err=>this.$message.error(err.msg))
      if(res){
        this.checkUser()
        this.$message.success('个人信息修改成功')
      } 
      this.handleClose()
    },
    handleClose() {
      this.showDialog = false
    },
    checkUser(){
      const id = localStorage.getItem('book_userId')
      id && api_userInfo(id).then(res=>{
        this.$store.commit('recordUserInfo',res)
      }).catch(err=>this.$message.error(err.msg))
    }
  },
}
</script>

<style lang="scss" scoped>
header {
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid #45bdc5;
  background: linear-gradient(360deg, #0080bc 0%, #00d8d8 100%);
  .avatarIcon{
    display: flex;
    justify-content: center;
    height: 55px;
    width: 55px;
    border: 3px solid #006A80 !important;
  }
  .content {
    height: 30vh;
    width: 100%;
    display: flex;
    .pic {
      width: 50%;
      height: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      .el-upload--text {
        .avatar-uploader-icon {
          border: 1px dashed #d9d9d9;
          font-size: 28px;
          color: #8c939d;
          width: 20vh;
          height: 20vh;
          line-height: 20vh;
          text-align: center;
        }
        .avatar {
          width: 20vh;
          height: 20vh;
          display: block;
          border: 4px solid #23CBE6 !important;
          border-radius: 100%;
        }
      }
    }
    .info {
      width: 50%;
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      .el-row {
        height: 40px;
        line-height: 40px;
        width: 100%;
        .el-col:first-child {
          text-align: center;
        }
      }
    }
  }
  .el-dropdown {
    position: absolute;
    right: 31px;
    display: flex;
    align-items: center;
    .name {
      font-size: 16px;
      margin-left: 15px;
      line-height: 72px;
      color: #fff;
    }
  }

  .title {
    width: 500px;
    height: 100%;
    display: flex;
    align-items: center;
    cursor: default;
    justify-content: center;
    text-align: center;
    color: #fff;
    line-height: 66px;
    font-size: 27px;
    font-weight: 400;
    background-color: #00b3d1;
    position: relative;
    .pic {
      border: 0;
      width: 41px;
      height: 36px;
      margin-right: 12px;
    }
  }
  .title:before {
    content: '';
    width: 75px;
    height: 100%;
    position: absolute;
    transform: skewX(45deg);
    //  背景颜色
    background-color: #00b3d1;
    border-left: 1px solid;
    border-color: RGBA(45, 183, 199, 1);
    left: -36px;
  }
  .title:after {
    content: '';
    width: 75px;
    height: 100%;
    position: absolute;
    transform: skewX(-45deg);
    //  背景颜色
    background-color: #00b3d1;
    border-right: 1px solid;
    border-color: RGBA(45, 183, 199, 1);
    right: -36px;
  }
}
</style>
