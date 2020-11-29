<template>
  <div class="content">
    <div class="operation">
      <Form :form="optForm" :formLabel="optFormLabel" inline>
        <el-button
          class="el-icon-search"
          @click="getTableList"
          type="info"
          plain
          >查询
        </el-button>
      </Form>
      <div>
        <el-button class="el-icon-plus" type="success" plain @click="openDialog"
          >批量关联
        </el-button>
        <!-- <el-button
          class="el-icon-plus"
          type="primary"
          plain
          @click="addDialog = true"
          >新建分类
        </el-button> -->
      </div>
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
        <!-- <template slot="operate" slot-scope="scope">
          <el-button
            type="text"
            size="mini"
            class="button-info"
            @click="handleEdit(scope.msg.row)"
            >编辑</el-button
          >
          <el-popconfirm
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
          </el-popconfirm>
        </template> -->
      </Table>
    </div>
    <AddCategory
      :showDialog="addDialog"
      :type="type"
      @close="getTableList"
      :form="ruleForm"
    ></AddCategory>
    <!-- 批量关联dialog -->
    <CategoryMany
      :showDialog="manyDialog"
      :checkList="checkList"
      :label="label"
      @close="getTableList"
    ></CategoryMany>
  </div>
</template>

<script>
import Form from '@/components/Form'
import Table from '@/components/Table'
import AddCategory from './AddCategory'
import CategoryMany from './CategoryMany'
import {
  api_categoryDelete,
  api_categoryEdit,
  api_categoryInfo,
  api_categoryList,
  api_categoryMany,
} from '../../../api/api'
export default {
  components: {
    Form,
    Table,
    AddCategory,
    CategoryMany,
  },
  data() {
    return {
      value: true,
      optForm: {
        keyWords: '',
        category: '',
      },
      optFormLabel: [
        {
          model: 'keyWords',
          point: '分类号',
          style: 'width:200px',
          del: true,
        },
        {
          model: 'category',
          point: '所属分类',
          style: 'width:200px',
          type: 'select',
          del: true,
          opts:[]
        },
      ],
      addDialog: false, //新增框
      passwordDialog: false, //密码重置框
      manyDialog: false, //批量
      tableData: [],
      tableLabel: [
        {
          prop: 'code',
          label: '图书分类号',
        },
        {
          prop: 'name',
          label: '分类详情名',
        },
        {
          prop: 'category',
          label: '所属分类',
          children: 'name',
        },
      ],
      config: {
        page: 1,
        pageSize: 15,
        total: 30,
        // isSwitch: true,
        type: true,
        opt:true
        // isTag: true,
      },
      type: false,
      ruleForm: {},
      checkList: [],
      label:[] //批量关联用
    }
  },
  methods: {
    //获取选择列表
    getCheckList(list) {
      this.checkList = list.map((val) => {
        return val._id
      })
    },
    openDialog() {
      if (this.checkList.length > 0) this.manyDialog = true
      else this.$message.warning('至少选择一条')
    },
    getTableList() {
      //初始化
      if (this.addDialog) this.addDialog = false
      if (this.manyDialog) this.manyDialog = false
      if (this.type) this.type = false
      const req = {
        keyWords: this.optForm.keyWords,
        category:this.optForm.category,
        pageNum: this.config.page,
        pageSize: this.config.pageSize,
      }
      api_categoryList(req).then((res) => {
        console.log(res)
        this.tableData = res.list
        this.config.total = res.count
      })
    },
    //编辑
    handleEdit(row) {
      this.type = true
      api_categoryInfo(row._id).then((res) => {
        this.ruleForm = res
      })
      this.addDialog = true
    },
    handle(row) {
      api_categoryEdit(row._id, row).then((res) => {
        if (res.message === 'success') this.$message.success('操作成功')
      })
    },
    handleDel(row) {
      api_categoryDelete(row._id).then((res) => {
        if (res.success) {
          this.$message.success('删除成功')
          this.getTableList()
        }
      })
    },
    //切换pageSize
    changeSize(pageSize) {
      this.config.pageSize = pageSize
      this.getTableList()
    },
    //切换page
    changePage(page) {
      this.config.page = page
      this.getTableList()
    },
  },
  created() {
    api_categoryMany()
      .then((res) => {
        res.forEach(val=>{
          const n = {
            value:val._id,
            label:val.name
          }
          this.optFormLabel[1].opts.push(n)
        })
        this.label = res
      })
      .catch((err) => {
        this.$message.error(err.msg)
      })
    this.getTableList()
  },
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
