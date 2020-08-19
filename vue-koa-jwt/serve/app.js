const Koa = require('koa')
const path = require('path')
const bodyparser = require('koa-bodyparser')
const jwt = require('koa-jwt');
const session = require('koa-session2');
const app = new Koa()
const cors = require('koa2-cors')

const errorHandle = require('./middlewares/errorHandle')
const RedisMiddleware = require("./middlewares/redis");
const index = require('./routes/index')
const json = require('koa-json')
// jwt密钥
const secret = 'jwt_secret';

app.use(bodyparser())

// Redis
// app.use(RedisMiddleware());

app.use(session({
  key: "SESSIONID",   //default "koa:sess"
}));

app.use(async (ctx, next) => {
// 允许来自所有域名请求
  ctx.set('Access-Control-Allow-Origin', '*')

  ctx.set('Access-Control-Allow-Methods', 'OPTIONS, GET, PUT, POST, DELETE')

  ctx.set('Access-Control-Allow-Headers', 'x-requested-with, accept, origin, content-type, Authorization')


  ctx.set('Content-Type', 'application/json;charset=utf-8')

  // ctx.set('Access-Control-Allow-Credentials', true)
  
  ctx.set('Access-Control-Max-Age', 300)

  await next()
})

// jwt校验
app.use(errorHandle)
.use(jwt({
  secret,
  // cookie: 'Authorization',
}).unless({
  path:[/^\/login/]
}))

app.use(json())
.use(cors())

app.use(index.routes(), index.allowedMethods())

// don't forget to export!
module.exports = app

// app.listen(3000, function(){
//     console.log('aaaaaaaaaa')
// })
