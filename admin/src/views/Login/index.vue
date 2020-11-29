<template>
  <div class="loginIndex">
    <div class="loginBody">
      <div class="loginContent">
        <div class="poster"><img src='../../assets/images/login_icon.png' class="pic"/>图书管理系统</div>
        <div class="loginBox">
          <div class="header">用户登录</div>
          <div class="inputBox" style="margin-bottom:34px">
            <el-input placeholder="请输入账号" v-model="userName">
              <i slot="prefix" style="font-size:30px" class="el-icon-user"></i>
            </el-input>
          </div>
          <div class="inputBox" style="margin-bottom:25px">
            <el-input placeholder="请输入密码" v-model="passWord" show-password>
              <i slot="prefix" style="font-size:30px"  class="el-icon-lock"></i>
            </el-input>
          </div>
          <div class="remember">
            <el-checkbox v-model="checked">记住密码</el-checkbox>
          </div>
          <el-button class="saveButton bubbly-button" @click="login">登录</el-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { api_login, api_userInfo } from '../../api/api'
export default {
  name: 'login',
  data () {
    return {
      userName: '',
      passWord: '',
      checked: false,
    }
  },
  methods: {
    login () {
      if (!this.userName || !this.passWord) {
        this.$message({
          message: '请输入账号密码',
          type: 'warning'
        })
        return
      }
      const req = {
        userName:this.userName,
        passWord:this.passWord
      }
      api_login(req).then(res=>{
        localStorage.setItem('book_token','Bearer ' + res.token)
        //存储用户id
        localStorage.setItem('book_userId', res.userInfo.id)
        this.checkUser()
        this.$router.replace({path:'/'})
        this.$message.success('登录成功')
      }).catch(err=>{
        this.$message.error(err.msg)
      })
    },
    checkUser(){
      const id = localStorage.getItem('book_userId')
      id && api_userInfo(id).then(res=>{
        this.$store.commit('recordUserInfo',res)
      }).catch(err=>this.$message.error(err.msg))
    }
  }
}
</script>

<style lang="scss">
  .loginIndex {
    width: 100%;
    height: 100%;
    background: url('../../assets/images/login_background.png');
    background-size:100%;
    .loginBody {
      width: 40%;
      height: 100%;
      // background: #ffffff;
      min-width: 250px;
      float: right;
      position: relative;
      .loginContent {
        width: 70%;
        height: 100%;
        position: relative;
        .loginBox {
          margin-top: 35px;
          height: 57%;
          padding: 0 65px;
          background: #FFFFFF;
          box-shadow: 6px 6px 10px rgba(0, 0, 0, 0.15);
          opacity: 1;
          border-radius: 16px 16px 16px 16px;
          .saveButton:focus {
            outline: 0;
          }
          .saveButton:active {
            transform: scale(0.9);
          }
          .el-button.saveButton, .saveButton:hover{
            width: 100%;
            height: 59px;
            margin-top: 78px;
            border-radius: 9px 9px 9px 9px;
            -webkit-appearance: none;
            appearance: none;
            transition: transform ease-in 0.1s;
            background: #00B3D1;
            border-color: #00B3D1;
            border-radius: 9px;
            line-height: 10px !important;
            span {
              color:#fff !important;
              font-size: 29px;
              font-family: Microsoft YaHei;
              font-weight: 400;
              line-height: 29px;
            }
          }
          .remember {
            .el-checkbox__label{
              height: 21px;
              font-size: 16px;
              font-family: MicrosoftYaHeiRegular;
              line-height: 15px;
              color: #00B3D1;
            }
            .el-checkbox__inner {
              width: 18px;
              height: 18px;
              border: 1px solid;
              color: #00B3D1 !important;
              border-color: #00B3D1 !important;
              opacity: 1;
              border-radius: 3px;
              &:after {
                height: 9px;
                left: 6px;
                color: #00B3D1 !important;
                border-color: #00B3D1 !important;
              }
            }
            .el-checkbox__input.is-checked .el-checkbox__inner::after {
              transform: rotate(45deg) scaleY(1) scaleX(1.5);
            }
          }
          .inputBox {
            width: 100%;
            .el-input__prefix {
              height: calc(100% - 26px);
              width: 72px;
              margin: 11px 0 13px -7px;
              &:before{
                content: " ";
                position: absolute;
                right: 0;
                top: 2px;
                bottom: 0;
                width: 1px;
                height: 100%;
                border-right: 3px solid;
                -webkit-transform-origin: 0 0;
                transform-origin: 0 0;
                -webkit-transform: scaleX(0.5);
                transform: scaleX(0.5);
                border-color: #00B3D1;
              }
            }
            .loginIcon {
              font-size: 36px;
              color: #00B3D1;
            }
            .el-input {
              background: #FFFFFF;
              border: 0px solid #00B3D1;
              .el-input__inner {
                height: 60px;
                border: 1px solid;
                padding-left: 93px;
                border-color: #00B3D1;
                background: #ffffff !important;
                border-radius: 9px 9px 9px 9px;
                font-size: 24px;
                font-family: Microsoft YaHei;
                font-weight: 400;
                line-height: 50px;
                color: #666666 !important;
                caret-color: #1DAACE !important;
                &::placeholder {
                  color: #AAAAAA !important;
                }
              }
            }
          }
          .header {
            padding: 30px 0;
            // margin: 0 65px;
            margin-bottom: 70px;
            // border-bottom: 2px solid;
            position: relative;
            text-align: center;
            font-size: 30px;
            font-weight: bold;
            font-family: MicrosoftYaHei-Bold;
            line-height: 30px;
            color: #00B3D1;
            border-color: #00B3D1;
            &:before{
              content: " ";
              position: absolute;
              right: 0;
              left: 0;
              bottom: -2PX;
              width: 100%;
              height: 1px;
              border-bottom: 3px solid;
              -webkit-transform-origin: 0 0;
              transform-origin: 0 0;
              -webkit-transform: scaleY(0.5);
              transform: scaleY(0.5);
              border-color: #00B3D1;
            }
          }
        }
        .poster {
          padding-top: 25%;
          width: 100%;
          display: flex;
          align-items: center;
          cursor: default;
          justify-content: center;
          text-align: center;
          font-size: 36px;
          font-family: Microsoft YaHei;
          font-weight: 400;
          line-height: 47px;
          color: #FFFFFF;
          position: relative;
          .pic {
            border: 0;
            width: 55px;
            height: 50px;
            margin-right: 22px;
            margin-top: 5px;
          }
        }
      }
    }
  }
</style>
