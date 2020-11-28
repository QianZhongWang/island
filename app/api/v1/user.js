//密码加密插件

const Router = require('koa-router');
const { RegisterValidator } = require('../../validators/validator');
const {User} = require('../../models/user');
const {success} = require('../../lib/helper');

const router = new Router({
  prefix: '/v1/user'
});

/**
 * 用户注册
 */
router.post('/register', async (ctx) => {
  const v = await new RegisterValidator().validate(ctx);

  const user = {
    email: v.get('body.email'),
    password: v.get('body.password1'),
    nickname: v.get('body.nickname')
  }

  await User.create(user)
  success()
})

router.post('/login',async (ctx) => {

})
module.exports = router;
