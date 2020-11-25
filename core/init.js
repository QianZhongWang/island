/**
 * @作者 QianZW
 * @创建时间 2020/11/24 7:20 下午
 */
const requireDirectory = require('require-directory');
const Router = require('koa-router');


/**
 *  全局初始化类
 */
class InitManager {

  static initCore(app) {
    InitManager.app = app;
    InitManager.initLoadRouter();
    InitManager.loadException();
    InitManager.loadConfig();
  }

  /**
   * 初始化路由
   */
  static initLoadRouter() {
    const apiDirectory = `${process.cwd()}/app/api`
    requireDirectory(module, apiDirectory, { visit: whenLoadModule });
    function whenLoadModule(obj) {
      if (obj instanceof Router) {
        InitManager.app.use(obj.routes());
      }
    }
  }

  /**
   * 加载错误异常类,不推荐使用
   * @static
   * @memberof InitManager
   */
  static loadException() {
    global.errs = require('./http-exception');
  }

  static loadConfig(path = '') {
    const configPath = path || process.cwd() + '/config/config.js';
    const config = require(configPath);
    global.config = config;
  }
}

module.exports = InitManager;
