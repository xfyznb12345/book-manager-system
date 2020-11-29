<template>
  <el-breadcrumb
    separator="/"
    class="breadcrumb"
  >
    <el-breadcrumb-item>{{ current.label || '' }}</el-breadcrumb-item>
    <el-breadcrumb-item v-if="currentSub">{{ currentSub.label || '' }}</el-breadcrumb-item>
  </el-breadcrumb>
</template>

<script>
export default {
  data () {
    return {
      current: "",
      currentSub: '',
    }
  },
  methods: {
    getPath () {
      if(JSON.parse(sessionStorage.getItem("currentMenu"))){
        this.current = JSON.parse(sessionStorage.getItem("currentMenu"))
        this.currentSub = JSON.parse(sessionStorage.getItem("currentMenuSub"))
      }else{
        this.current = {
          label:'首页'
        }
      }
    }
  },
  created () {
    this.getPath()
  },
  watch: {
    $route: "getPath"
  }
}
</script>
<style lang="scss">
.breadcrumb {
  line-height: 49px;
  height: 49px;
  background-color: #DEF5FF;
  // opacity: 0.79;
  padding-left: 42px;
  .el-breadcrumb__item span{
    height: 19px;
    font-size: 14px;
    font-family: Microsoft YaHei;
    font-weight: 400 !important;
    line-height: 19px;
    color: #006A80;
    // color: #006A80 !important;
    opacity: 1;
  }
  .el-breadcrumb__separator {
    margin: 0 5px;
  }
}
</style>
