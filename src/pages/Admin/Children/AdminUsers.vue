<template>
  <div id="admin-users">
    <el-table
      :data="tableData"
      style="width: 100%">
      <el-table-column
        prop="id"
        label="用户ID">
      </el-table-column>
      <el-table-column
        prop="user_name"
        label="账号">
      </el-table-column>
      <el-table-column
        prop="user_phone"
        label="手机">
      </el-table-column>
      <el-table-column
        prop="user_nickname"
        label="昵称">
      </el-table-column>
      <el-table-column
        prop="user_address"
        label="住址">
      </el-table-column>
      <el-table-column
        prop="user_status"
        label="状态">
      </el-table-column>
      <el-table-column
        label="操作">
        <template
          slot-scope="props">
          <el-button
            size="mini"
            type="primary"
            v-if="props.row.user_status == '已冻结'"
            @click="handleRecovery(props.$index, props.row)">
            恢复</el-button>
          <el-button
            size="mini"
            type="danger"
            v-if="props.row.user_status == '可使用'"
            @click="handleFrozen(props.$index, props.row)">
            冻结</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { getAllUsers, frozenUser, recoveryUser } from './../../../api/index'
export default {
  data() {
    return {
      tableData: [],
    }
  },
  mounted() {
    this.getUsers()
  },
  methods: {
    async getUsers() {
      const results = await getAllUsers()
      if (results.success_code === 200) {
        this.tableData = results.message
        this.tableData.forEach((data, index) => {
          if (typeof data.user_status != 'string') {
            if (data.user_status == 0) {
              data.user_status = '已冻结'
            } else {
              data.user_status = '可使用'
            }
          }
        })
      }
    },
    async handleRecovery(index, row) {
      this.$confirm('您确定要解封该用户吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      })
        .then(async () => {
          let result = await recoveryUser(row.id)
          if (result.success_code === 200) {
            this.$router.go(0)
            this.$message({
              type: 'success',
              message: '已解封',
            })
          }
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消解封',
          })
        })
    },
    async handleFrozen(index, row) {
      this.$confirm('您确定要冻结该用户吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      })
        .then(async () => {
          let result = await frozenUser(row.id)
          if (result.success_code === 200) {
            this.$router.go(0)
            this.$message({
              type: 'success',
              message: '已冻结',
            })
          }
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消冻结',
          })
        })
    },
  },
}
</script>

<style scoped>
#admin-users {
  margin-left: 300px;
  margin-top: 40px;
}
</style>
