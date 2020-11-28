/**
 * @作者 QianZW
 * @创建时间 2020/11/24 8:06 下午
 */
const Router = require('koa-router');
const { capitalize } = require('lodash');
const router = new Router();
const { ParameterException } = require('../../../core/http-exception')
const { PositiveIntegerValidator } = require('../../validators/validator')
/**
 * 测试获取路径的一些参数
 */
router.post('/v1/:id/classic/latest', async (ctx, next) => {
  const path = ctx.params;
  const query = ctx.request.query;
  const headers = ctx.request.header;
  const body = ctx.request.body

  // 3.测试校验器,
  const v = await new PositiveIntegerValidator().validate(ctx);

  ctx.body = 'success';


  //2.测试报错信息
  /* if (true) {
  *  throw new ParameterException()
  }*/

  //1.返回参数信息
  /* ctx.body = {
    path,
    query,
    headers,
    body
  }*/
})
module.exports = router;
