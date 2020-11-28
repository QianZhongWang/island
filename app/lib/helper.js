/**
 * 成功提示
 * @param msg
 * @param error_code
 */
function success(msg, error_code) {
    throw new global.errs.Success(msg, error_code);
}

function throwParameterErr(msg, error_code) {
    throw new global.errs.ParameterException(msg, error_code)
}

/**
 * 资源为找到提示
 * @param msg
 * @param error_code
 */
function throwNotFound(msg, error_code) {
    throw new global.errs.Notfound(msg, error_code)
}

/**
 * 授权失败
 * @param msg
 * @param error_code
 */
function authorization(msg, error_code) {
    throw new global.errs.AuthFailed(msg, error_code)
}

function throwForbidden(msg, error_code) {
    throw new global.errs.Forbidden(msg, error_code)
}

module.exports = {
    throwParameterErr,
    success,
    throwNotFound,
    authorization,
    throwForbidden
}
