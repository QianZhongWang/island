/**
 * 关于http错误的封装
 * @class HttpException
 * @extends {Error}
 */
class HttpException extends Error {
    constructor(message = '服务器异常', errorCode = 1000, statusCode = 400) {
        super();
        this.message = message;
        this.statusCode = statusCode;
        this.errorCode = errorCode;
    }
}

/**
 * 参数错误类型
 * @class ParameterException
 * @extends {HttpException}
 */
class ParameterException extends HttpException {
    constructor(message, errorCode) {
        super();
        this.statusCode = 400;
        this.message = message || '参数错误';
        this.errorCode = errorCode || 10000;
    }
}

/**
 * 成功操作
 */
class Success extends HttpException {
    constructor(message, errorCode) {
        super();
        this.code = 201;
        this.message = message || 'ok';
        this.errorCode = errorCode || 0;
    }
}

class Notfound extends HttpException {
    constructor(message, errorCode) {
        super();
        this.code = 404;
        this.message = message || '资源未找到';
        this.errorCode = errorCode || 1000;

    }
}

class AuthFailed extends HttpException {
    constructor(message, errorCode) {
        super();
        this.code = 401;
        this.message = message || '授权失败';
        this.errorCode = errorCode || 1004;
    }
}

class Forbidden extends HttpException {
    constructor(msg, errorCode) {
        super();
        this.message = msg || '禁止访问';
        this.errorCode = errorCode || 10006;
        this.code = 403;
    }
}


module.exports = {
    ParameterException,
    HttpException,
    Success,
    Notfound,
    AuthFailed,
    Forbidden
}
