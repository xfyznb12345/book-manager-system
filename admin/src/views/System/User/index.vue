<template>
  <div class="content">
    <div class="operation">
      <Form :form="optForm" :formLabel="optFormLabel" inline>
        <el-button class="el-icon-search" type="info" plain @click="getTableList">查询 </el-button>
      </Form>
      <el-button class="el-icon-plus" type="primary" plain @click="addDialog = true"
        >新增
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
      >
        <template slot="operate" slot-scope="scope">
          <el-button
            type="text"
            size="mini"
            class="button-info"
            @click="passwordDialog = true"
            >重置密码</el-button
          >
          <el-button
            type="text"
            size="mini"
            class="button-info"
            @click="handleEdit(scope.msg.row)"
            >编辑</el-button
          >
          <el-popconfirm
            title="确定删除？"
            style="margin-left:10px"
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
        </template>
      </Table>
    </div>
    <AddUser
      :showDialog="addDialog"
      :editForm="editForm"
      @close="getTableList"
    ></AddUser>
    <PasswordEdit
      :showDialog="passwordDialog"
      @close="passwordDialog = false"
    ></PasswordEdit>
  </div>
</template>

<script>
import Form from '@/components/Form'
import Table from '@/components/Table'
import AddUser from './AddUser'
import PasswordEdit from './PasswordEdit'
import { api_usersDelete, api_usersList } from '../../../api/api'
export default {
  components: {
    Form,
    Table,
    AddUser,
    PasswordEdit
  },
  data () {
    return {
      optForm: {
        keyWords: ''
      },
      optFormLabel: [
        {
          del: true,
          model: 'keyWords',
          point: '用户名/姓名/手机号',
          style: 'width:210px'
        }
      ],
      addDialog: false, // 新增框
      passwordDialog: false, // 密码重置框
      tableData: [],
      tableLabel: [
        {
          prop: '_id',
          label: 'ID'
        },
        {
          prop: 'userName',
          label: '用户名'
        },
        {
          prop: 'nickName',
          label: '姓名'
        },
        {
          prop: 'role',
          label: '所属角色',
          children: 'roleName'
        },
        {
          prop: 'phone',
          label: '手机号'
        },
        {
          prop: 'email',
          label: '邮箱'
        }
      ],
      config: {
        actionWidth: 200, // 操作宽度
        page: 1,
        pageSize: 15,
        total: 30
      },
      editForm: {}
    }
  },
  methods: {
    getTableList () {
      // form 置空
      this.editForm = {}
      if (this.addDialog) this.addDialog = false
      const req = {
        keyWords: this.optForm.keyWords,
        pageNum: this.config.page,
        pageSize: this.config.pageSize
      }
      api_usersList(req).then((res) => {
        this.tableData = res.list
        this.config.total = res.count
      })
    },
    // 编辑
    handleEdit (row) {
      if (row.role.roleName === '最高管理员') {
        this.$message.error('不可编辑')
        return
      }
      this.editForm = row
      this.editForm.role && (this.editForm.role = row.role._id)
      this.addDialog = true
    },
    async handleDel (row) {
      if (row.role.roleName === '最高管理员') {
        this.$message.error('最高管理员不可删除')
        return
      }
      const res = await api_usersDelete(row._id).catch(err => {
        this.$message.error(err.msg)
      })
      if (res) {
        this.$message.success('删除成功')
        this.getTableList()
      }
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
  }
}
</style>
