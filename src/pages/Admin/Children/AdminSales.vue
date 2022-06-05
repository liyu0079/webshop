<template>
  <div class="goods-detail">
    <div class="goods-detail-top">商品信息</div>
    <div class="goods-detail-group">
      <div class="goods-icon">
        <span>图片</span>
        <img :src="goodsInfo.thumb_url" alt="">
      </div>
      <div class="goods-item">
        <span>ID</span>
        <span>{{ goodsInfo.goods_id }}</span>
      </div>
      <div class="goods-item">
        <span>名称</span>
        <span>{{goodsInfo.short_name}}</span>
      </div>
      <div class="goods-item">
        <span>分类</span>
        <span v-if="goodsInfo.category ==1 ">图书、音像</span>
        <span v-if="goodsInfo.category ==2 ">家居生活</span>
        <span v-if="goodsInfo.category ==3 ">服饰、箱包</span>
        <span v-if="goodsInfo.category ==4 ">电子产品</span>
        <span v-if="goodsInfo.category ==5 ">美食宝典</span>
      </div>
      <div class="goods-item">
        <span>价格</span>
        <el-input
          type="number"
          placeholder="请输入价格"
          v-model="goodsInfo.price"
          clearable
          style="width:100px"
        >
        </el-input>
      </div>
      <div class="goods-item">
        <span>折扣</span>
        <el-input
          type="number"
          placeholder="请输入折扣"
          v-model="goodsInfo.discount"
          clearable
          style="width:100px;margin-right:-680px;"
        >
        </el-input>
        <i>%</i>
      </div>
      <div class="goods-item">
        <span>满减</span>
        <i style="margin-left:500px;">满</i>
        <el-input
          type="number"
          placeholder="请输入件数"
          v-model="goodsInfo.cut_count"
          clearable
          style="width:100px;"
        >
        </el-input>
        <i>件，减</i>
         <el-input
          type="number"
          placeholder="请输入减额"
          v-model="goodsInfo.cut_price"
          max="100"
          clearable
          style="width:100px;"
        >
        </el-input>
        <i>元</i>
      </div>                
      <button type="text" @click="setDiscount()">设置折扣</button>
      <button @click="removeDiscount()">取消折扣</button>
    </div>
  </div>
</template>

<script>
  import {mapState} from 'vuex';
  import {discountGoods} from './../../../api/index';

  export default {
    data() {
      return {
        goodsInfo: {},
      }
    },
     mounted(){
        this.goodsInfo = JSON.parse(window.localStorage.getItem('goodsInfo'));
    },
    methods:{
      // 设置商品折扣
      async setDiscount(){
        this.goodsInfo.price = Number(this.goodsInfo.price);
        this.goodsInfo.discount = Number(this.goodsInfo.discount);
        this.goodsInfo.cut_count = Number(this.goodsInfo.cut_count);
        this.goodsInfo.cut_price = Number(this.goodsInfo.cut_price);
        let result = await discountGoods(this.goodsInfo);
        if(result.success_code === 200){
          this.$message({
              type: 'success',
              message: '设置成功'
            });
        }
      },
      // 取消商品折扣
      async removeDiscount(){
        this.goodsInfo.price = Number(this.goodsInfo.price);
        this.goodsInfo.discount = Number(100);
        this.goodsInfo.cut_count = Number(0);
        this.goodsInfo.cut_price = Number(0);
        let result = await discountGoods(this.goodsInfo);
        if(result.success_code === 200){
          this.$message({
              type: 'success',
              message: '取消成功'
            });
        }
      }
    },
  }
</script>

<style scoped lang="stylus" ref="stylesheet/stylus">
  .goods-detail
    width 70%
    height 100%
    margin 20px 400px
    .goods-detail-top
      width 100%
      height 60px
      line-height 60px
      padding-left 10px
      font-weight bold
    .goods-detail-group
      .goods-icon
        height 60px
        padding 0 10px
        background-color #fff
        border-bottom: 1px solid #e0e0e0
        display flex
        justify-content space-between
        align-items center
        img
          width 50px
          border-radius 50%
      .goods-item
        height 50px
        padding 0 10px
        background-color #fff
        border-bottom: 1px solid #e0e0e0
        display flex
        justify-content space-between
        align-items center
        input
          border 1px solid #ccc
          outline none
          text-align right
          width 200px
      button
        width 20%
        height 40px
        line-height 40px
        background-color #e9232c
        text-align center
        margin 60px 0
        border none
        font-size 16px
        color #fff
        border-radius 10px
    .right-title-color
      color #999
      font-size 14px
</style>

