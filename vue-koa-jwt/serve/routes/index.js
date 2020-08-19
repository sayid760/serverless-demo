const router = require('koa-router')()
const jsonwebtoken = require('jsonwebtoken'); 
// router.prefix('/api')
const secret = 'jwt_secret';

router.get('/', async (ctx) => {
    ctx.body = 'hi koa'
})


router.get('/register', async (ctx) => {
    ctx.body = 'hi koa'
})

router.post('/login', async (ctx, next) => {
  let { username, password } = ctx.request.body;
  // 1. 判断mysql是否有该用户
  // 2. jwt生成token
  // if (users.length > 0) {...}
  let token = jsonwebtoken.sign({
    data: username,
      // exp in seconds 这种方式也可以
      // exp: Math.floor(Date.now() / 1000) - (60 * 60) // 60 seconds * 60 minutes = 1 hour
      // exp: Math.floor(Date.now() / 1000) + 15 // 设置token为15秒的有效期
  }, secret,
  { expiresIn: '30s' }
  )

  // 3. 设置redis
  // await ctx.redis.set('token', token);
  ctx.session.token = token;

  // console.log(ctx.session.token)
  ctx.body = {
    code: 200,
    msg: 'success',
    token
  }
})

router.get('/getUserInfor', async (ctx) => {
  // const token = await ctx.redis.get('token');
  ctx.session.name = '111111111'
  ctx.body = {
    code: 200,
    msg: 'success',
    data:{
        name:'xiaoming'
    }
  }
})

router.post('/logout', async (ctx, next) => {
  console.log(ctx.session.name)
  // await ctx.redis.set('token', null);
  ctx.body = { msg: '退出成功', data: '', code: 200 }
})

module.exports = router