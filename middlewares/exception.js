
/**
 * 全局拦截异常报错信息
 * @param ctx
 * @param next
 * @returns {Promise<void>}
 */
const { HttpException } = require('../core/http-exception')
const catchError = async (ctx, next) => {
  try {
    await next();
  } catch (error) {
    //开发环境，和生产环境
    if (global.config.environment === 'dev') {
      throw error;
    }

    //已知异常
    if (error instanceof HttpException) {
      ctx.body = {
        message: error.message,
        errorCode: error.errorCode,
        request: `${ctx.method} ${ctx.path}`
      }
      ctx.status = error.statusCode;
    } else {
      ctx.body = {
        message: '我们写了一个bug',
        errorCode: 999,
        request: `${ctx.method} ${ctx.path}`
      }
      ctx.status = 500
    }
  }
}
module.exports = catchError;
