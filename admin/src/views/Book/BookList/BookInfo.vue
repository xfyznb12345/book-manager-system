<template>
  <el-dialog
    :visible.sync="showDialog"
    width="1038px"
    :show-close="false"
    :close-on-click-modal="false"
    @open="openDialog"
  >
    <!-- 头部 -->
    <span slot="title" class="dialog-title">
      <i class="el-icon-warning-outline"></i>
      详情
    </span>
    <!-- 内容 -->
    <div class="content">
      <el-row>
        <el-col :span="4">书名</el-col>
        <el-col :span="8">{{ tableData.title }}</el-col>
        <el-col :span="4">作者</el-col>
        <el-col :span="8">{{ tableData.author }}</el-col>
      </el-row>
      <el-row>
        <el-col :span="4">出版社</el-col>
        <el-col :span="8">{{ tableData.press }}</el-col>
        <el-col :span="4">出版年月</el-col>
        <el-col :span="8">{{ tableData.date }}</el-col>
      </el-row>
      <el-row>
        <el-col :span="4">分类号</el-col>
        <el-col :span="8">{{ tableData.code }}</el-col>
        <el-col :span="4">所属分类</el-col>
        <el-col :span="8">{{ tableData.category }}</el-col>
      </el-row>
      <el-row>
        <el-col :span="4">关键词</el-col>
        <el-col :span="20">{{ tableData.keyWord }}</el-col>
      </el-row>
      <el-row>
        <el-col :span="4">摘要</el-col>
        <el-col :span="20">{{ tableData.abstract }}</el-col>
      </el-row>
    </div>
    <!-- 底部 -->
    <span slot="footer" class="dialog-footer">
      <el-button type="primary" class="closeButton" @click="handleClose"
        >关闭</el-button
      >
    </span>
  </el-dialog>
</template>

<script>
import { api_bookInfo } from '../../../api/api'
export default {
  props: {
    showDialog: Boolean,
    id: String,
  },
  data() {
    return {
      tableData: [],
    }
  },
  methods: {
    openDialog() {
      api_bookInfo({ id: this.id })
        .then((res) => {
          this.tableData = res
        })
        .catch((err) => {
          this.$message.error(err.msg)
        })
    },
    handleClose() {
      this.$emit('close')
    },
  },
}
</script>

<style lang="scss" scoped>
.el-dialog {
  .content {
    .el-row:not(:last-child) {
      white-space:nowrap;
      height: 2.8rem;
      line-height: 2.8rem;
    }
    .el-row:last-child {
      height: 100%;
      .el-col {
        border-bottom: none;
      }
      .el-col:first-child {
        line-height: 2.8rem;
      }
      .el-col:last-child {
        line-height: 28px;
        padding-left: 1rem;
        text-indent: 2em;
        text-align: left;
      }
    }
    .el-col {
      text-align: center;
      font-size: 16px;
      border-left: 1px solid #dbdfe0;
      border-bottom: 1px solid #dbdfe0;
      display: flex;
      justify-content: center;
      align-items: center;
    }
    .el-col:first-child {
      border-left: none;
    }
    .el-row:nth-child(even) {
      background: #f2fbff;
    }
    .el-col:nth-child(odd) {
      font-family: Microsoft YaHei;
      font-weight: 500;
      color: #606266;
    }
  }
}
</style>
