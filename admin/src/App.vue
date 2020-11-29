<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
import { api_userInfo } from './api/api'
export default {
  name: 'app',
  methods:{
    checkUser(){
      const id = localStorage.getItem('book_userId')
      id && api_userInfo(id).then(res=>{
        this.$store.commit('recordUserInfo',res)
      }).catch(err=>this.$message.error(err.msg))
    }
  },
  created(){
    this.checkUser()
  }
}
</script>

<style>
#app{
  height: 100vh;
}
</style>
