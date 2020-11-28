/**
 * @作者 QianZW
 * @创建时间 2020/11/26 7:40 下午
 */

/**
 * 登陆方式的枚举
 * @type {{USER_MINI_PROGRAM: number, USER_EMAIL: number, USER_MOBILE: number, ADMIN_EMAIL: number}}
 */
function isThisType(val) {
  for (let key in this){
    if (this[key]==val){
      return true;
    }
  }
  return false;
}

const LoginType = {
  USER_MINI_PROGRAM: 100,
  USER_EMAIL: 101,
  USER_MOBILE: 102,
  ADMIN_EMAIL: 200,
  isThisType
}

module.exports = {
  LoginType
}
