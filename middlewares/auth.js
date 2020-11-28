/**
 * @作者 QianZW
 * @创建时间 2020/11/27 10:45 上午
 * @desc 权限控制中间件
 */
const {throwForbidden} = require('../app/lib/helper')
const basicAuth = require('basic-auth');
const jwt = require('jsonwebtoken')

class Auth {
    constructor(level) {
        this.level = level || 1;//给接口分配权限
        Auth.USER = 8;
        Auth.ADMIN = 16;
        Auth.SUPER_ADMIN = 32;
    }

    /**
     * 权限的属性
     * @returns {function(*, *): Promise<void>}
     */
    get midWay() {
        return async (ctx, next) => {
            const userToken = await basicAuth(ctx.req);
            let errorMessage = 'token令牌不合法';
            if (!userToken || !userToken.name) {
                throwForbidden(errorMessage)
            }
            let decode;
            try {
                decode = jwt.verify(userToken.name, global.config.security.secretKey)
            } catch (error) {
                if (error === 'TokenExpiredError') {
                    errorMessage = 'token令牌已过期'
                }
                throwForbidden(errorMessage);
            }

            if (decode.scope < this.level) {
                errorMessage = "用户权限不足";
                throwForbidden(errorMessage)
            }
            ctx.auth = {
                uid: decode.uid,
                scope: decode.scope
            }
            await next();
        }
    }

    /**
     *
     */
    static verifyToken(token) {
        try {
            jwt.verify(token, global.config.security.secretKey)
            return true;
        }catch (error){
            return false;
        }
    }
}

module.exports = {
    Auth
}
