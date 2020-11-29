<template>
  <el-menu
    router
    :default-active="$route.path"
    background-color="#006A80"
    text-color="#FFFFFF"
    active-text-color="#00FFFF"
  >
    <el-menu-item
      v-for="item in noChildren"
      :index="item.path"
      :key="item.path"
      @click="clickMenu(item)"
    >
      <i :class="`el-icon-${item.icon}`"></i>
      <span slot="title">{{ item.label }}</span>
    </el-menu-item>
    <el-submenu v-for="item in hasChildren" :index="item.path" :key="item.path">
      <template slot="title">
        <i :class="`el-icon-${item.icon}`"></i>
        <span slot="title">{{ item.label }}</span>
      </template>
      <el-menu-item-group>
        <el-menu-item
          :index="subItem.path"
          v-for="subItem in item.children"
          :key="subItem.path"
          @click="clickMenu(item,subItem)"
        >
          <span slot="title">{{ subItem.label }}</span>
        </el-menu-item>
      </el-menu-item-group>
    </el-submenu>
  </el-menu>
</template>

<script>
export default {
  computed: {
    //一级菜单
    noChildren() {
      return this.asideMenu.filter((val) => !val.children);
    },
    //二级菜单
    hasChildren() {
      return this.asideMenu.filter((val) => val.children);
    },
  },
  data() {
    return {
      //导航栏
      asideMenu: [
        {
          path: "/home",
          label: "首页",
          icon: "s-home",
        },
        {
          path: "/book",
          label: "图书管理",
          icon: "notebook-1",
          children: [
            {
              path: "/book/booklist",
              label: "图书列表",
            },
            {
              path: "/book/category",
              label: "图书分类",
            },
          ],
        },
        {
          path: "/business",
          label: "运营管理",
          icon: "s-management",
          children: [
            {
              path: "/business/adlist",
              label: "广告位",
            },
          ],
        },
        {
          path: "/system",
          label: "系统管理",
          icon: "user",
          children: [
            {
              path: "/system/admin",
              label: "角色管理",
            },
            {
              path: "/system/user",
              label: "用户列表",
            },
          ],
        },
      ],
    };
  },
  methods:{
    clickMenu(item,subItem){
      sessionStorage.removeItem("currentMenuSub")
      console.log(item);
      const current = item && JSON.stringify(item)
      const currentSub = subItem && JSON.stringify(subItem)
      item && sessionStorage.setItem("currentMenu", current)
      subItem && sessionStorage.setItem("currentMenuSub", currentSub)
    }
  }
};
</script>

<style lang="scss" scoped>
.el-menu ::v-deep{
  height: 100%;
  width: 100%;
  .el-submenu__title {
    padding-left: 25px !important;
    font-size: 15px;
  }
  .el-submenu .el-menu-item{
    padding-left: 50px !important;
  }
  .el-menu-item {
    font-size: 15px;
    padding-left: 25px !important;
  }
}
</style>
