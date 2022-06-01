<template>
  <div class="order">
    <div
      class="order-content">
      <div class="title">
        <h3>我的订单</h3>
      </div>
      <div class="chosetype">
        <table>
          <thead>
            <tr>
              <th
                style="padding-left:200px;">
                商品</th>
              <th
                style="padding-left:180px;">
                订单详情</th>
              <th
                style="padding-left:220px;">
                收货人</th>
              <th
                style="padding-left:120px;">
                金额</th>
              <th
                style="padding-left:120px;">
                状态</th>
              <th
                style="padding-left:120px;">
                操作</th>
            </tr>
          </thead>
        </table>
      </div>
      <div class="orders">
        <!-- 每一笔订单 -->
        <table
          class="order-item"
          v-for="(order, index) in tempData"
          :key="index">
          <div
            v-if="order.state != 3">
            <thead>
              <tr>
                <th
                  colspan="5">
                  <span
                    class="ordertitle">{{ order.create_date }}
                    订单编号：{{ order.order_number }}
                    <span
                      class="pull-right delete"
                      @click="delrecord(order.id)"><img
                        src="./images/delete.png" /></span>
                  </span>
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td
                  style="width:550px;height:100px">
                  <div
                    class="typographic">
                    <img
                      :src="order.goods_img"
                      style="width:100px;height:100px" />
                    <a href="#"
                      class="block-text"
                      style="margin-left:100px;">{{ order.goods_name }}</a>
                    <span>x{{ order.buy_count}}</span>
                  </div>
                </td>
                <td
                  :rowspan="order.length"
                  class="center">
                  {{ order.receive_name }}
                </td>
                <td
                  :rowspan="order.length"
                  style="padding-left:80px;width:250px"
                  class="center">
                  <ul
                    class="unstyled">
                    <li>
                      总金额{{ order.total_amount/100  | moneyFormat}}
                    </li>
                    <li>在线支付
                    </li>
                  </ul>
                </td>
                <td
                  :rowspan="order.length"
                  style="padding-left:30px;width:150px"
                  class="center">
                  <span
                    @click="goPay(order.id)"
                    class="btn"
                    style="padding-left:0px;"
                    v-if="order.state == 0">未付款</span>
                  <span
                    v-if="order.state == 1">已付款</span>
                  <span
                    v-if="order.state == 2">已取消</span>
                </td>
                <td
                  :rowspan="order.length"
                  class="center">
                  <ul
                    class="unstyled">
                    <li
                      v-if="order.state == 1">
                      <a href="mycomment.html"
                        target="_blank">评价|晒单</a>
                    </li>
                    <li
                      v-if="order.state == 0">
                      <el-container>
                        <el-button
                          type="text"
                          @click="dialogVisible = true">
                          取消订单
                        </el-button>
                        <el-dialog
                          :visible.sync="dialogVisible"
                          width="25%"
                          :before-close="handleClose"
                          class="dialog">
                          <span style="font-size:20px;margin-left:80px">确定要取消该订单吗</span>
                          <span
                            slot="footer"
                            class="dialog-footer">
                             <el-button
                              type="primary"
                              @click="cancelPay(order.id)">
                              确定
                            </el-button>
                            <el-button
                              @click="dialogVisible = false">
                              取消
                            </el-button>
                          </span>
                        </el-dialog>
                      </el-container>
                    </li>
                  </ul>
                </td>
              </tr>
            </tbody>
          </div>
          <div class="line">
          </div>
        </table>
      </div>
      <div
        class="choose-order">
        <!-- 分页器 -->
        <el-pagination
          background
          layout="prev, pager, next"
          :page-count="pageNum"
          @current-change="handleCurrentChange">
        </el-pagination>
      </div>
    </div>
    <!--猜你喜欢-->
    <div class="like">
      <h4 class="kt">猜你喜欢</h4>
      <ul class="like-list">
        <li class="likeItem">
          <div class="p-img">
            <img
              src="./images/itemlike01.png" />
          </div>
          <div class="attr">
            <em>DELL戴尔Ins
              15MR-7528SS 15英寸
              银色 笔记本</em>
          </div>
          <div class="price">
            <em>¥</em>
            <i>3699.00</i>
          </div>
          <div class="commit">
            已有6人评价</div>
        </li>
        <li class="likeItem">
          <div class="p-img">
            <img
              src="./images/itemlike02.png" />
          </div>
          <div class="attr">
            Apple苹果iPhone
            6s/6s Plus 16G 64G
            128G
          </div>
          <div class="price">
            <em>¥</em>
            <i>4388.00</i>
          </div>
          <div class="commit">
            已有700人评价</div>
        </li>
        <li class="likeItem">
          <div class="p-img">
            <img
              src="./images/itemlike03.png" />
          </div>
          <div class="attr">
            DELL戴尔Ins
            15MR-7528SS 15英寸
            银色 笔记本</div>
          <div class="price">
            <em>¥</em>
            <i>4088.00</i>
          </div>
          <div class="commit">
            已有700人评价</div>
        </li>
        <li class="likeItem">
          <div class="p-img">
            <img
              src="./images/itemlike04.png" />
          </div>
          <div class="attr">
            DELL戴尔Ins
            15MR-7528SS 15英寸
            银色 笔记本</div>
          <div class="price">
            <em>¥</em>
            <i>4088.00</i>
          </div>
          <div class="commit">
            已有700人评价</div>
        </li>
      </ul>
    </div>
    <el-button type="primary" @click="getReload">刷新</el-button>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { deleteShoppingRecord } from './../../api/index'
export default {
  
  name: '',
  data() {
    return {
      //初始化页码和每页数据个数
      currentIndex: 1,
      pageSize: 4,
      tableData: [],
      tempData: [],
      dialogVisible: false,
    }
  },
  inject:['reload'],
  mounted() {
    // 获取订单数据
    this.getAllrecord()
  },
  computed: {
    ...mapState(['userInfo', 'shoppingrecord']),
    reverseSum() {
      return this.shoppingrecord.reverse()
    },
    pageNum() {
      return Math.ceil(this.shoppingrecord.length / this.pageSize)
    },
  },
  watch: { 
    $route (to, from) 
    { 
      this.$router.go(0) 
        // 获取订单数据
    this.getAllrecord()
      } 
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
          this.tempData.push(data)
        }
      })
    },
    async getAllrecord() {
      let user_id = this.userInfo.id
      await this.$store.dispatch('reqShoppingRecord', { user_id })
      this.tableData = this.reverseSum
      this.tableData.forEach((data, index) => {
        if (
          index >= (this.currentIndex - 1) * this.pageSize &&
          index < this.currentIndex * this.pageSize
        ) {
          this.tempData.push(data)
        }
      })
    },
    goPay(orderId) {
      this.$router.push('/pay?orderId=' + orderId)
    },
    handleClose(done) {
        this.$confirm('确认关闭？')
          .then(_ => {
            done();
          })
          .catch(_ => {});
      },
    cancelPay(id) {
      this.$confirm('您确定要取消该订单吗？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      })
        .then(() => {
         this.$store.dispatch('celShoppingRecord', { id })
          this.dialogVisible = false
          this.$router.go(0)
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除',
          })
        })
    },
    delrecord(id) {
      deleteShoppingRecord(id)
    },
    getReload() {
      this.reload() //调用刷新
    },
    

  },
}
</script>

<style lang="less" scoped>
ul li {
  list-style: none;
}
a{
  text-decoration: none;
  color: black;
}
.order {
  width: 100%;
  .order-content {
    margin: 30px;
    .title {
      background: rgb(234, 236, 236);
    }
    .orders {
      margin-left: 150px;
      .line {
        margin: 0;
        padding: 0;
        width: 1200px;
        height: 1px;
        background-color: #d5dae4;
        overflow: hidden;
      }
      .dialog{
        display: flex;
        justify-content: center;
        align-items: center;
      }
    }
    .chosetype {
      background: rgb(208, 209, 209);
    }
    .choose-order {
      text-align: center;
    }
  }
  .like {
    width: 100%;
    .kt {
      margin: 20px;
      background: rgb(234, 236, 236);
    }
    .like-list {
      .likeItem {
        margin: 30px;
        width: 20%;
        float: left;
      }
    }
  }
}
</style>