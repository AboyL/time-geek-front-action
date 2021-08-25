const router = require('koa-router')()
const {
  Blog,
} = require('../db/model');
const { get, set } = require('../cache/_redis');

router.get('/', async (ctx, next) => {
  const zhangsan = await Blog.create({
    userId: 123,
    content: '博客内容',
    image: '假装是图片'
  })
  console.log(zhangsan.dataValues);
  const setValue = Date.now()
  await set('key', `${setValue}`)
  await ctx.render('index', {
    title: '创建成功',
    content: JSON.stringify(zhangsan.dataValues),
    redis: setValue
  })
})

router.get('/get', async (ctx, next) => {
  const value = await get('key')
  ctx.body = 'setValue ' + value
})


module.exports = router
