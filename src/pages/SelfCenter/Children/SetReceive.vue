<template>
  <div id="receive_info">
    <el-table
      :data="tableData"
      style="width: 100%">
      <el-table-column
        prop="id"
        label="收货地址ID">
      </el-table-column>
      <el-table-column
        prop="receive_name"
        label="收货人">
      </el-table-column>
      <el-table-column
        prop="receive_address"
        label="收货地址">
      </el-table-column>
      <el-table-column
        prop="receive_phone"
        label="收货电话">
      </el-table-column>
      <el-table-column
        label="操作">
        <template
          slot-scope="props">
          <el-button
            size="mini"
            type="primary"
            @click="handleEdit(props.$index, props.row)">
            编辑</el-button>
          <el-button
            size="mini"
            type="danger"
            @click="handleDelete(props.$index, props.row)">
            删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div>
      <el-button
        icon="el-icon-plus"
        @click="openWindow"
        size="mini">添加
      </el-button>
      <el-dialog
        :visible.sync="windowVisible"
        append-to-body>
        <addReceive
          v-if="windowVisible"
          ref="popWindow">
        </addReceive>
        <span slot="footer"
          class="dialog-footer">
          <el-button
            type="primary"
            @click="onSubmit">
            设置</el-button>
          <el-button
            @click="windowVisible = false">
            取消</el-button>
        </span>
      </el-dialog>
    </div>

  </div>
</template>

<script>
import addReceive from '@/pages/SelfCenter/Children/addReceive'
import { getReceiveInfo, delteReceiveInfo, updateReceiveInfo,createReceiveInfo } from './../../../api/index'
import { mapState } from 'vuex'

export default {
  data() {
    return {
      tableData: [],
      windowVisible: false,
      addreceive: undefined,
    }
  },
  components: {
    addReceive,
  },
  computed: {
    ...mapState(['userInfo']),
  },
  mounted() {
    this.getReceiveInfo()
  },
  methods: {
    async getReceiveInfo() {
      let user_id = this.userInfo.id
      let result = await getReceiveInfo(user_id)
      if (result.success_code === 200) {
        this.tableData = result.message
      }
    },
    openWindow() {
      this.windowVisible = true
      this.addreceive = true
    },
    handleEdit(index, row) {
      this.windowVisible = true
      this.addreceive = false
      this.$nextTick(() => {
        this.$refs.popWindow.dataInit(row)
      })
    },
    handleDelete(index, row) {
      this.$confirm('您确定要删除该收货地址吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      })
        .then(async () => {
          let result = await delteReceiveInfo(row.id)
          if (result.success_code === 200) {
            this.$router.go(0)
            this.$message({
              type: 'success',
              message: '已删除',
            })
          }
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除',
          })
        })
    },
    async onSubmit() {
      let user_id = this.userInfo.id
      //需要提交的form表单
      let form = this.$refs.popWindow.form
      if (form.address_default === true) {
        form.address_default = 1
      } else {
        form.address_default = 0
      }
      if (this.addreceive) {
        //axios 添加新增
       let result = await createReceiveInfo(form,user_id);
       console.log(user_id)
       if(result.success_code === 200){
           this.$router.go(0)
           this.$message({
              type: 'success',
              message: '增加成功',
            })
       }
      } else {
        //axios 编辑修改
        let result = await updateReceiveInfo(form);
        if(result.success_code === 200){
            this.$router.go(0)
            this.$message({
              type: 'success',
              message: '编辑成功',
            })
        }
      }
    },
  },
}
</script>

<style scoped>
#receive_info {
  margin-left: 300px;
  margin-top: 40px;
}
</style>