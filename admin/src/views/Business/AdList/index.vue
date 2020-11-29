<template>
  <div class="content">
    <div class="operation">
      <el-button class="el-icon-plus" type="primary" plain @click="addNewTab"
        >新建广告位
      </el-button>
    </div>
    <el-divider></el-divider>
    <el-tabs v-model="activeName" type="border-card" @tab-click="handleClick">
      <el-tab-pane
        v-for="(item, index) in tableTab"
        :key="index"
        :label="item.title"
        :name="index.toString()"
      >
        <TabContent :tabContent="tabContent" :isNew="isNewTab" @replace="initTabList" @cancleNewTab="cancleNewTab" @deleteAd="deleteAd"></TabContent>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import { api_AdList } from '../../../api/api'
import TabContent from './TabContent'
export default {
  components: {
    TabContent,
  },
  data() {
    return {
      activeName: '0', //激活页
      tableTab: [], //tab导航栏信息
      tabContent: {}, //选中页的内容
      isNewTab: false, //是否存在新建页面
    }
  },
  methods: {
    //添加新Tab
    addNewTab() {
      if (!this.isNewTab) {
        this.tableTab.push({ title: 'new Advertisement'})
        this.activeName = (this.tableTab.length - 1).toString()
        this.isNewTab = true
        this.handleClick()
      }
    },
    //切换tab页
    handleClick() {
      this.tabContent = this.tableTab[this.activeName]
    },
    //删除广告位
    deleteAd(){
      this.tableTab.splice(this.activeName,1)
      //如果是最后一个被删除
      if(this.activeName > this.tableTab.length-1) this.activeName = (this.tableTab.length-1).toString()
      this.handleClick()
    },
    //新页面取消创建
    cancleNewTab(){
      this.tableTab.pop()
      this.isNewTab = false
      this.activeName = (this.tableTab.length - 1).toString()
      this.handleClick()
    },
    //初始化表格
    initTabList() {
      this.isNewTab && (this.isNewTab =false)
      api_AdList().then((res) => {
        this.tableTab = res
        this.tabContent = this.tableTab[this.activeName]
      })
    },
  },
  created() {
    this.initTabList()
  },
}
</script>

<style lang="scss" scoped>
.content {
  height: 100%;
  width: 100%;
  .operation {
    display: flex;
    justify-content: flex-end;
    margin-bottom: 20px;
  }

  .el-tabs ::v-deep {
    height: calc(100% - 85px);
    .el-tabs__item {
      height: 50px;
      line-height: 50px;
      font-size: 18px;
    }
    .el-tabs__content {
      height: calc(100% - 40px);
      .el-tab-pane {
        height: 100%;
      }
    }
  }
}
</style>
