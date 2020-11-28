/**
 * @作者 QianZW
 * @创建时间 2020/11/24 5:11 下午
 */
const {Auth} = require('../../../middlewares/auth');
const Router = require('koa-router');
const router = new Router({
    prefix: '/v1/classic'
});


router.get('/latest', new Auth().midWay, (ctx, next) => {

    ctx.body = {
        uid: ctx.auth.uid,
        scope: ctx.auth.scope
    }
})


module.exports = router;
