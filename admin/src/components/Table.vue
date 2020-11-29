<template>
  <div class="common-table">
    <el-table :data="tableData" border stripe @selection-change="handleSelectionChange"
      :row-key="getRowKey" height="95%">
      <!-- 选择框 -->
      <el-table-column
        type="selection"
        width="55"
        v-if="config.type"
        align="center"
      ></el-table-column>
      <el-table-column
        show-overflow-tooltip
        v-for="item in tableLabel"
        :key="item.prop"
        :label="item.label"
        align="center"
      >
        <!-- 这个template就是一个插槽; 通过作用域插槽可以使用外部变量  -->
        <template slot-scope="scope">
          <span style="margin-left: 10px" v-if="item.children">{{ scope.row[item.prop] && scope.row[item.prop][item.children]}}</span>
          <span style="margin-left: 10px" v-else>{{ scope.row[item.prop] }}</span>
        </template>
      </el-table-column>
      <!-- 标签 -->
      <el-table-column label="关键词" v-if="config.isTag" align="center">
        <!-- 这个template就是一个插槽; 通过作用域插槽可以使用外部变量  -->
        <template slot-scope="scope">
          <slot name="tag" :msg="scope"></slot>
        </template>
      </el-table-column>
      <!-- 开关 -->
      <el-table-column label="是否启用" v-if="config.isSwitch" align="center">
        <!-- 这个template就是一个插槽; 通过作用域插槽可以使用外部变量  -->
        <template slot-scope="scope">
          <slot name="switch" :msg="scope"></slot>
        </template>
      </el-table-column>
      <el-table-column label="操作" :width="config.actionWidth ? config.actionWidth : 140" align="center" v-if="!config.opt">
        <!-- 这个template就是一个插槽; 通过作用域插槽可以使用外部变量  -->
        <template slot-scope="scope">
          <slot name="operate" :msg="scope"></slot>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="config.page"
      :page-sizes="[5, 10, 15, 30]"
      :page-size="config.pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="config.total"
    >
    </el-pagination>
  </div>
</template>

<script>
export default {
  props: {
    tableData: Array,
    tableLabel: Array,
    // 接受其他配置
    config: Object,
  },
  data(){
    return {
      // checkList:[]
    }
  },
  methods: {
    handleSizeChange(pageSize) {
      this.$emit('changeSize', pageSize)
    },
    handleCurrentChange(page) {
      this.$emit('changePage', page)
    },
    getRowKey (row) {
      return row.id
    },
    // 获取多选框
    handleSelectionChange (val) {
      console.log(val,'====');
      this.$emit("checkList", val)
    },
  },
}
</script>

<style lang="scss" scoped>
.common-table ::v-deep {
  width: 100%;
  background-color: #fff;
  height: 100%;
  position: relative;
  .el-table {
    height: 100%;
    border-radius: 6px 6px 0px 0px;
  }
.el-table::before{
  height: 0;
}
  // 斑马纹
  .el-table--striped .el-table__body tr.el-table__row--striped td {
    background-color: #F2FBFF;
  }
  .el-table th {
    background-color: #00b3d1;
    color: #ffffff;
    font-weight: 400;
    font-size: 16px;
    height: 46px;
  }
  //表格样式
  .el-table td {
    height: 40px;
    font-size: 14px;
    font-family: Arial;
    font-weight: 400;
    // background-color: #666666;
  }
  .el-pagination {
    position: absolute;
    bottom: 10px;
    right: 10px;
  }
}
</style>
