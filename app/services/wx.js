const util = require('util')
const axios = require('axios')
const {throwForbidden} = require('../lib/helper')
const {User} = require('../models/user')
const {generateToken} = require('../../core/util')
const {Auth} = require('../../middlewares/auth')

class WxManageer {
    static async codeToToken(code) {
        const url = util.format(global.config.wx.loginUrl,
            global.config.wx.appId,
            global.config.wx.appSecret,
            code);

        const result = await axios.get(url);

        if (result.status !== 200) {
            throwForbidden('openid failed')
        }

        const errorcode = result.data.errcode;
        const errmsg = result.data.errmsg;
        if (errorcode) {
            throwForbidden(`openid failed: ${errorcode} ${errmsg}`)
        }

        let user = await User.getUserByOpenid(result.data.openid);

        if (!user) {
            user = await User.registerByOpenid(result.data.openid);
        }

        return generateToken(user.id, Auth.user)
    }
}

module.exports = {
    WxManageer
}
