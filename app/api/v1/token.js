const Router = require('koa-router');
const {TokenValidator, NotEmptyValidator} = require('../../validators/validator')
const {success, throwParameterErr} = require('../../lib/helper')
const {LoginType} = require('../../lib/enum')
const {User} = require('../../models/user')
const router = new Router({
    prefix: '/v1/token'
});
const {generateToken} = require('../../../core/util')
const {Auth} = require('../../../middlewares/auth')
const {WxManageer} = require('../../services/wx')

router.post('/', async (ctx) => {
    const v = await new TokenValidator().validate(ctx);
    let token;
    switch (v.get('body.type')) {
        case LoginType.USER_EMAIL:
            token = await emailLogin(v.get('body.account'), v.get('body.secret'));
            break;
        case LoginType.USER_MINI_PROGRAM:
            token = await WxManageer.codeToToken(v.get('body.account'));
            break;
        default:
            throwParameterErr('没有相应的处理函数')
            break;
    }
    ctx.body = {
        token
    }
});

router.post('/verify', async (ctx) => {
    const v = await new NotEmptyValidator().validate(ctx);
    const result = await Auth.verifyToken(v.get('body.token'));
    ctx.body = {
        result
    }
})

/**
 * email登录
 * @param account
 * @param secret
 * @returns {Promise<string>}
 */
async function emailLogin(account, secret) {
    const user = await User.verifyEmailPassword(account, secret);
    const id = user.id;
    return generateToken(id, Auth.USER);
}


module.exports = router;
