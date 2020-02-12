<template>
  <div class="top">
    <div class="container">
      <img class="logo" src="@/assets/logo.png" alt />
      <div>
        <span>{{successName}}</span>
        <el-button @click="dialogFormVisible = true">登陆</el-button>
        <el-button @click="handleLogout">退出</el-button>
        <router-link to="/cart"><i class="iconfont cart">&#xe600;</i></router-link>
      </div>
    </div>
    <el-dialog title="登陆界面" :visible.sync="dialogFormVisible">
      <el-form :model="form" status-icon :rules="rules">
        <el-form-item label="用户名" prop="username" :label-width="formLabelWidth">
          <el-input v-model="form.username"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="pass" :label-width="formLabelWidth">
          <el-input type="password" v-model="form.pass"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="handleLogin">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    var validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      }
    };
    return {
      dialogFormVisible: false,
      form: {
        username: "",
        pass: ""
      },
      rules: {
        pass: [{ validator: validatePass, trigger: "blur", required: true }],
        username: [
          { required: true, message: "请输入活动名称", trigger: "blur" }
        ]
      },
      formLabelWidth: "120px",
      successName:""
    };
  },
  methods:{
      handleLogin(){
          if(this.form.username && this.form.pass){
              this.$http({
                  url:"/users/login",
                  method:"post",
                  data:{
                      userName:this.form.username,
                      userPwd:this.form.pass
                  }
              }).then(res=>{
                  if(res.data.code==200){
                      this.$message({
                          message:res.data.msg,
                          duration:1000,
                          type:"success"
                      })
                      this.dialogFormVisible = false;
                      this.successName = res.data.result
                  }else{
                      this.$message({
                          duration:1000,
                          message:res.data.msg,
                          type:"error"
                      })
                  }
              })
          }else{
              this.$message({
                  message:"用户名和密码不能为空",
                  duration:1000,
                  type:"error"
              })
          }
      },
      handleLogout(){
        this.$http.post('/users/logout').then(res=>{
          this.$message({
            message:res.data.msg,
            duration:1000
          })
          this.successName = ""
        })
      }
  },
  mounted(){
      this.$http.get('/users/checkLogin').then(res=>{
          if(res.data.code==200){
            this.successName = res.data.result
          }else{
            this.$message({
              duration:1000,
              message:"未登录",
              type:"warning"
            })
          }
      })
  }
};
</script>

<style lang="scss" scoped>
.top {
  background: #fff;
}
.logo {
  width: 50px;
}
.container {
  margin: 0 auto;
  width: 1100px;
  display: flex;
  align-items: center;
  height: 60px;
  justify-content: space-between;
}
.cart {
  font-size: 25px;
  color: #c20c0c;
  margin-left: 20px;
}
</style>