/**
 * @作者 QianZW
 * @创建时间 2020/11/24 5:07 下午
 */
const Router = require('koa-router');
const router = new Router();

router.get('/v1/book/latest', (ctx, next) => {
  ctx.body = {
    key: 'book'
  }
})



module.exports = router;
