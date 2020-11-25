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

module.exports = {
	ParameterException,
	HttpException
}