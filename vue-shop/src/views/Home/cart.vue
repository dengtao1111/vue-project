<template>
  <div class="about">
    <h1>我的购物车</h1>
    <div class="content">
      <div class="nav">
        <span style="width:250px">选择</span>
        <span style="width:280px">商品</span>
        <span style="width:280px">价格</span>
        <span style="width:280px">数量</span>
        <span style="width:280px">小计</span>
        <span style="width:280px">操作</span>
      </div>
      <div class="item" v-for="item of cartList" :key="item.id">
        <span style="width:250px">
          <van-checkbox class="checked" v-model="item.checked"></van-checkbox>
        </span>
        <span style="width:280px">
          <img class="bg" :src="item.productImage" alt />
          <p>{{item.productName}}</p>
        </span>
        <span style="width:280px">{{item.salePrice}}</span>
        <span style="width:280px">
          <van-stepper v-model="item.productNum" />
        </span>
        <span style="width:280px">{{item.salePrice*item.productNum}}</span>
        <span style="width:280px">
          <van-button type="danger">删除</van-button>
        </span>
      </div>
      <div>
        <van-submit-bar :disabled="disabled"   :price="sum" button-text="提交订单" >
          <van-checkbox v-model="checkAll">全选</van-checkbox>
        </van-submit-bar>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      cartList: [],
      disabled:true
    };
  },
  methods:{
      handleDelete(productId){
          this.$http.post('/users/cart/del',{
              productId
          }).then(res=>{
              console.log(res)
              this.ininData()
          })
      },
      ininData(){
          this.$http("/users/cart").then(res=>{
              this.cartList = res.data.result;
          })
      },
      async onChange(item){
          var {productNum,productId,checked} = item;
          await this.$http.post('/users/cartList')
      }
  },
  mounted() {
    this.ininData
  },
  computed: {
    checkAll: {
      get() {
        return this.cartList.every(item=>item.checked)
      },
      set(val) {
       this.cartList.forEach(item=>(item.checked = val))
      }
    },
    sum() {
      var total = 0;
      for (let i = 0; i < this.cartList.length; i++) {
        if (this.cartList[i].checked) {
          total =
            total + this.cartList[i].productNum * this.cartList[i].salePrice;
        } else {
          continue;
        }
      }
      return total * 100;
    }
  }
};
</script>
<style  scoped>
.van-checkbox{
  margin-left: 80px;
}
h1 {
  width: 100%;
  text-align: center;
  background: #ebebeb;
  font-size: 20px;
  height: 40px;
  line-height: 40px;
}
.nav {
  width: 100%;
  height: 50px;
  background: black;
  color: #fff;
  display: flex;
  align-items: center;
  font-size: 20px;
}
.nav span {
  text-align: center;
}
.item {
  display: flex;
  align-items: center;
  font-size: 16px;
  text-align: center;
  margin-bottom: 30px;
}
.bg {
  width: 80px;
  height: 100px;
}
</style>