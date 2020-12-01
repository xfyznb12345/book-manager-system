<template>
  <div class="content">
    <div class="operation">
      <Form :form="optForm" :formLabel="optFormLabel" inline>
        <el-button
          class="el-icon-search"
          @click="getTableList(1)"
          type="info"
          plain
          >查询
        </el-button>
      </Form>
      <el-button
        class="el-icon-plus"
        type="primary"
        plain
        @click="addDialog = true"
        >批量导入
      </el-button>
    </div>
    <el-divider></el-divider>
    <div class="table">
      <Table
        :tableData="tableData"
        :tableLabel="tableLabel"
        :config="config"
        @changeSize="changeSize"
        @changePage="changePage"
        @checkList="getCheckList"
      >
        <template slot="operate" slot-scope="scope">
          <!-- <el-button
            type="text"
            size="mini"
            class="button-info"
            @click="handleEdit(scope.msg.row)"
            >编辑</el-button
          > -->
          <el-button
            type="text"
            size="mini"
            class="button-info"
            @click="handleInfo(scope.msg.row)"
            >详情</el-button
          >
          <!-- <el-popconfirm
            style="margin-left:10px"
            title="确定删除？"
            @onConfirm="handleDel(scope.msg.row)"
          >
            <el-button
              slot="reference"
              type="text"
              size="mini"
              class="button-info"
              >删除</el-button
            >
          </el-popconfirm> -->
        </template>
      </Table>
    </div>
    <BookInfo :showDialog="infoDialog" :id="infoId" @close="getTableList">
    </BookInfo>
  </div>
</template>

<script>
import Form from '@/components/Form'
import Table from '@/components/Table'
import BookInfo from './BookInfo'
import {
  api_bookList,
  api_categoryDelete,
  api_categoryEdit,
  api_categoryInfo
} from '../../../api/api'
export default {
  components: {
    Form,
    Table,
    BookInfo
  },
  data () {
    return {
      value: true,
      optForm: {
        keyWords: ''
      },
      optFormLabel: [
        {
          model: 'keyWords',
          point: '书名/作者',
          style: 'width:200px',
          del: true
        }
      ],
      addDialog: false, // 新增框
      passwordDialog: false, // 密码重置框
      manyDialog: false, // 批量
      infoDialog: false,
      infoId: '',
      tableData: [],
      tableLabel: [
        {
          prop: 'title',
          label: '书名'
        },
        {
          prop: 'author',
          label: '作者'
        },
        {
          prop: 'press',
          label: '出版社'
        },
        {
          prop: 'code',
          label: '图书分类号'
        },
        {
          prop: 'date',
          label: '出版年月'
        }
      ],
      config: {
        page: 1,
        pageSize: 15,
        total: 30,
        type: true
      },
      type: false,
      ruleForm: {},
      checkList: []
    }
  },
  methods: {
    // 获取选择列表
    getCheckList (list) {
      this.checkList = list.map((val) => {
        return val._id
      })
    },
    openDialog () {
      if (this.checkList.length > 0) this.manyDialog = true
      else this.$message.warning('至少选择一条')
    },
    getTableList (page) {
      // 初始化
      if (this.infoDialog) this.infoDialog = false
      if (page) this.config.page = page
      const req = {
        keyWords: this.optForm.keyWords,
        pageNum: this.config.page,
        pageSize: this.config.pageSize
      }
      api_bookList(req).then((res) => {
        this.tableData = res.list
        this.config.total = res.count
      })
    },
    // 详情
    handleInfo (row) {
      this.infoId = row._id
      this.infoDialog = true
    },
    // 编辑
    handleEdit (row) {
      this.type = true
      api_categoryInfo(row._id).then((res) => {
        this.ruleForm = res
      })
      this.addDialog = true
    },
    handle (row) {
      api_categoryEdit(row._id, row).then((res) => {
        if (res.message === 'success') this.$message.success('操作成功')
      })
    },
    handleDel (row) {
      api_categoryDelete(row._id).then((res) => {
        if (res.success) {
          this.$message.success('删除成功')
          this.getTableList()
        }
      })
    },
    // 切换pageSize
    changeSize (pageSize) {
      this.config.pageSize = pageSize
      this.getTableList()
    },
    // 切换page
    changePage (page) {
      this.config.page = page
      this.getTableList()
    }
  },
  created () {
    this.getTableList()
  }
}
</script>

<style lang="scss" scoped>
.content {
  height: 100%;
  .operation {
    display: flex;
    justify-content: space-between;
  }
  .table {
    height: calc(100% - 88px);
    .el-tag {
      margin-left: 5px;
    }
  }
}
</style>
