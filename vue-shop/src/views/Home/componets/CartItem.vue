<template>
  <div>
    <div class="item">
      <img :src="data.productImage" alt />
      <p>{{data.productName}}</p>
      <p style="color:#C20C0C;text-align:left">{{"$"+data.salePrice}}</p>
      <el-button type="danger" plain>加入购物车</el-button>
    </div>
  </div>
</template>

<script>
export default {
    props:['data'],
    methods:{
        addCart(productId){
            this.$http({
                method:"post",
                url:'/users/addCart',
                data:{
                    productId
                }
            }).then(res=>{
                console.log(res)
            })
        }
    }
};
</script>

<style lang="scss" scoped>
.item img {
  width: 140px;
}
.item {
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 20px;
  text-align: center;
  width: 140px;
  height: 280px;
  background: #fff;
  border: 1px solid #eee;
  .el-button--danger {
    width: 150px;
  }
}
</style>