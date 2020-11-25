/**
 * @作者 QianZW
 * @创建时间 2020/11/24 5:11 下午
 */
const Router = require('koa-router');
const router = new Router();

router.get('/v1/classic/latest', (ctx, next) => {
  ctx.body = {
    key: 'classic'
  }
})



module.exports = router;
