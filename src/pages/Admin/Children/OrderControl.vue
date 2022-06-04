<template>
  <div id="admin-order">
    <el-table
      :data="tempData"
      style="width: 100%">
      <el-table-column
        prop="user_id"
        label="用户ID">
      </el-table-column>
      <el-table-column
        prop="order_number"
        label="订单编号">
      </el-table-column>
      <el-table-column
        prop="goods_name"
        label="商品名称">
      </el-table-column>
      <el-table-column
        prop="buy_price"
        label="商品单价">
      </el-table-column>
      <el-table-column
        prop="buy_count"
        label="商品份数">
      </el-table-column>
      <el-table-column
        prop="total_amount"
        label="商品总价">
      </el-table-column>
      <el-table-column
        prop="status"
        label="订单状态">
      </el-table-column>
      <el-table-column
        prop="receive_name"
        label="收件人">
      </el-table-column>
      <el-table-column
        prop="receive_address"
        label="收件地址">
      </el-table-column>
      <el-table-column
        prop="remark"
        label="用户留言">
      </el-table-column>
      <el-table-column
        label="操作">
        <template
          slot-scope="props">
          <el-button
          type="primary"
            size="mini"
            @click="handlePost(props.$index, props.row)">
            确认发货</el-button>
            <br/>
          <el-button
            size="mini"
            type="success"
            style="margin-top:5px;"
            @click="handleFinish(props.$index, props.row)">
            完成订单</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="choose-order">
      <!-- 分页器 -->
      <el-pagination
        background
        layout="prev, pager, next"
        :page-count="pageNum"
        @current-change="handleCurrentChange">
      </el-pagination>
    </div>
  </div>
</template>

<script>
import { reqAllShoppingRecord } from './../../../api/index'
import { mapState } from 'vuex'
export default {
  data() {
    return {
      //初始化页码和每页数据个数
      currentIndex: 1,
      pageSize: 4,
      tableData: [],
      tempData: [],
    }
  },
  computed: {
    ...mapState(['shoppingrecord']),
     pageNum() {
      return Math.ceil(this.tableData.length / this.pageSize)
    },
  },
  mounted() {
    this.getAllShoppingRecord()
  },
  methods: {
    handleCurrentChange(val) {
      this.currentIndex = val
      this.tempData = []
      this.tableData.forEach((data, index) => {
        if (
          index >= (this.currentIndex - 1) * this.pageSize &&
          index < this.currentIndex * this.pageSize
        ) {
          if(typeof(data.buy_price)!='string'){
            data.buy_price ='¥'+ data.buy_price/100
          }
          if(typeof(data.total_amount)!='string'){
          data.total_amount ='¥'+ data.total_amount/100
          }
          if(typeof(data.status)!='string'){
            if(data.status == 0){
                data.status = '未付款'
            }else if(data.status == 1){
                data.status= '已付款'  
            }else if(data.status == 2){
                data.status= '已取消'
            }else{
              data.status= '用户删除记录'
            }
          }
          this.tempData.push(data)
        }
      })
    },
    async getAllShoppingRecord() {
      let results = await reqAllShoppingRecord()
      if (results.success_code === 200) {
        this.tableData = results.message;
        this.tableData.reverse().forEach((data, index) => {
        if (
          index >= (this.currentIndex - 1) * this.pageSize &&
          index < this.currentIndex * this.pageSize
        ) {
          //判断是否为原数据
          if(typeof(data.buy_price)!='string'){
            data.buy_price ='¥'+ data.buy_price/100
          }
          if(typeof(data.total_amount)!='string'){
          data.total_amount ='¥'+ data.total_amount/100
          }
          if(typeof(data.status)!='string'){
            if(data.status == 0){
                data.status = '未付款'
            }else if(data.status == 1){
                data.status= '已付款'  
            }else if(data.status == 2){
                data.status= '已取消'
            }else{
              data.status= '用户删除记录'
            }
          }
          this.tempData.push(data)
        }
      })
      }
    },
  },
}
</script>

<style scoped>
#admin-order{
  margin-top: 50px;
  margin-left: 300px;
  width: 1100px;
}
.choose-order{
  margin-top: 20px;
}
</style>
