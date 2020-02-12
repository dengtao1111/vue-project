const router = require('koa-router')()
const UsersModel = require('../models/users');
const GoodsModel = require('../models/goods');
router.prefix('/users')

router.get('/', async ctx => {
  var data = await UsersModel.find({});
  ctx.body = {
    code: 200,
    msg: "请求成功",
    result: data
  }

})
// 添加购物车
router.post('/addCart', async ctx => {
  var userId = "100000077";
  if (userId) {
    var { productId } = ctx.request.body;
    var goodsData = await GoodsModel.findOne({ productId: productId });
    // productNum,checked
    var obj = JSON.parse(JSON.stringify(goodsData));
    obj.productNum = 1;
    obj.checked = true;
    var userData = await UsersModel.findOne({});
    if (userData.cartList.every(item => item.productId != productId)) {
      await UsersModel.update({ userId: userId }, { $push: { "cartList": obj } })
      ctx.body = {
        msg: "添加成功",
        code: 200
      }
    } else {
      ctx.body = {
        msg: "已经添加到购物车",
        code: 200
      }
    }
  }else{
    ctx.body = {
      msg:"没有登录"
    }
  }

  /* 从goods查询数据  添加到users */
})

// 登陆模块
router.post('/login', async ctx => {
  var data = ctx.request.body;
  var res = await UsersModel.findOne(data);
  if (res) {
    ctx.cookies.set("userId", res.userId, {
      maxAge: 1000 * 60 * 60
    })
    ctx.cookies.set("userName", res.userName, {
      maxAge: 1000 * 60 * 60
    })
    ctx.body = {
      code: "200",
      msg: "登陆成功",
      result: res.userName
    }
  } else {
    ctx.body = {
      code: "400",
      msg: "用户名和密码错误"
    }
  }
})
//检查一下登陆的状态
router.get('/checkLogin', async ctx => {
  var userId = ctx.cookies.get("userId");
  if (userId) {
    ctx.body = {
      code: 200,
      msg: "登陆成功",
      result: ctx.cookies.get("userName")
    }
  } else {
    ctx.body = {
      code: 1001,
      msg: "未登录"
    }
  }
})

router.post('/logout', async ctx => {
  ctx.cookies.set("userId", "", {
    maxAge: -1
  })
  ctx.cookies.set("userName", "", {
    maxAge: -1
  })
  ctx.body = {
    code: 200,
    msg: "退出登陆"
  }
})
router.get('/cart',async ctx=>{
  var data = await UsersModel.findOne({})
  var res = data.cartList;
  ctx.body={
    code:200,
    result:res
  }
})
router.post("/cartList/edit",async ctx=>{
  var {productNum,productId} = ctx.request.body;
  var userId = ctx.cookies.get("userId");
  var data = await UsersModel.update(
    {userId:userId,"cartList.productId":productId},{$set:{
      "cartList.$.productNum":productNum
    }})
    if(data.ok==1){
      ctx.body = {
        msg:"修改成功",
        code:200
      }
    }
})
module.exports = router