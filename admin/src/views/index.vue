<template>
  <el-container>
    <el-header>
      <Header></Header>
    </el-header>
    <el-container>
      <el-aside>
        <Aside></Aside>
      </el-aside>
      <el-main>
        <Tab></Tab>
        <div class="main"><router-view></router-view></div>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import Aside from "../components/Aside";
import Header from "../components/Header";
import Tab from "../components/Tab";
export default {
  components: {
    Aside,
    Header,
    Tab,
  },
  data() {
    return {
    };
  },
  methods: {
  },
};
</script>
<style lang="scss" scoped>
.el-container {
  height: 100%;
  .el-header {
    padding: 0;
    height: 72px !important;
  }
  .el-aside {
    width: 260px !important;
  }
  .el-main {
    padding: 0;
    .main{
      padding: 15px 47px;
      width: 100;
      height: calc(100% - 49px);
    }
  }
}
</style>
