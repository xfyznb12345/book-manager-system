<template>
  <div class="content">
    <div class="operation">
      <el-button
        class="el-icon-plus"
        type="primary" plain
        @click="
          title = '新增'
          editDialog = true
        "
        >新增</el-button
      >
    </div>
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
            @click="handleEdit(scope.msg.row)"
            >修改</el-button
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
        </template>
      </Table>
    </div>
    <!-- 新增\修改 -->
    <el-dialog :visible.sync="editDialog" width="30%" :show-close="false">
      <!-- 头部 -->
      <span slot="title" class="dialog-title">
        <i class="el-icon-warning-outline"></i>
        {{ title }}
      </span>
      <!-- 内容 -->
      <Form :formLabel="formLabel" :form="form" ref="form"></Form>
      <!-- 底部 -->
      <span slot="footer" class="dialog-footer">
        <el-button @click="handleClose">取 消</el-button>
        <el-button type="primary" @click="roleEdit">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import Table from '@/components/Table'
import Form from '@/components/Form'
import {
  api_rolesAdd,
  api_rolesDelete,
  api_rolesEdit,
  api_rolesList,
} from '../../../api/api'
export default {
  components: {
    Table,
    Form,
  },
  data() {
    return {
      tableData: [],
      tableLabel: [
        {
          prop: 'id',
          label: 'ID',
        },
        {
          prop: 'roleName',
          label: '角色',
        },
        {
          prop: 'describe',
          label: '角色描述',
        },
      ],
      // 表格其他配置
      config: {
        // 当前页
        page: 1,
        // 每页显示条数
        pageSize: 15,
        // 总数
        total: 0,
      },
      editDialog: false,
      title: '',
      form: {
        roleName: '',
        describe: '',
      },
      formLabel: [
        {
          model: 'roleName',
          label: '角色名称',
          point: '角色名称',
        },
        {
          model: 'describe',
          label: '角色描述',
          point: '角色描述',
          textarea: 'textarea',
        },
      ],
    }
  },
  methods: {
    //查询列表
    getTableList() {
      const req = {
        pageNum: this.config.page,
        pageSize: this.config.pageSize,
      }
      api_rolesList(req)
        .then((res) => {
          this.tableData = res.list
          this.config.total = res.count
          let id = this.config.pageSize * (this.config.page - 1) + 1
          this.tableData.forEach((val) => {
            val.id = id
            id++
          })
        })
        .catch((err) => {
          this.$message.error(err.msg)
        })
    },
    //增加角色
    async roleEdit() {
      if (this.title === '新增') {
        const res = await api_rolesAdd(this.form).catch((err) => {
          this.$message.error(err.msg)
        })
        if (res) {
          this.$message.success('新增成功')
          this.handleClose()
          this.getTableList()
        }
      } else {
        const res = await api_rolesEdit(this.form).catch((err) => {
          this.$message.error(err.msg)
        })
        if (res) {
          this.$message.success('保存成功')
          this.handleClose()
          this.getTableList()
        }
      }
    },
    //修改
    handleEdit(row) {
      if(row.roleName==='最高管理员'){
        this.$message.error('该角色不可被修改')
        return
      }
      const { _id, roleName, describe } = row
      this.form = {
        _id,
        roleName,
        describe,
      }
      this.title = '编辑'
      this.editDialog = true
    },
    //删除
    async handleDel(row) {
      if(row.roleName==='最高管理员'){
        this.$message.error('该角色不可被删除')
        return
      }
      const res  = await api_rolesDelete(row._id).catch(err=>{
        this.$message.error(err.msg)
      })
      if(res){
        this.$message.success('删除成功')
        this.getTableList()
      }
    },
    //关闭并清空表单
    handleClose() {
      //关闭框
      this.editDialog = false
      //清空表单
      this.form = {
        roleName: '',
        describe: '',
      }
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
    this.getTableList()
  },
}
</script>

<style lang="scss" scoped>
.content ::v-deep {
  width: 100%;
  height: 100%;
  .operation {
    display: flex;
    justify-content: flex-end;
    margin-bottom: 16px;
  }
  .table {
    height: calc(100% - 56px);
  }
}
</style>
