<template>
  <div class="home">
    <home-top></home-top>
    <div class="wrap">
      <nav-bread style="line-height:3">
        <span slot="bread">商品详情</span>
      </nav-bread>
      <Content></Content>
    </div>
  </div>
</template>

<script>
import HomeTop from "./componets/HomeTop";
import NavBread from "./componets/NavBread";
import Content from './componets/Content'
export default {
  name: "home",
  components: {
    HomeTop,
    NavBread,
    Content
  },
  beforeRouteLeave (to, from, next) {
    this.$http('/users/checkLogin').then(res=>{
      if(res.data.code ==200){
        next()
      }else{
        this.$message({
          message:res.data.msg,
          duration:1000
        })
      }
    })
  }
};
</script>
<style scoped>
.wrap {
  width: 1100px;
  margin-left: auto;
  margin-right: auto;
}
</style>