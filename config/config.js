//环境配置文件
module.exports = {
    //环境配置项 prod
    environment: 'dev',

    //数据库配置项
    database: {
        dbName: 'island',
        host: 'localhost',
        port: 3306,
        user: 'root',
        password: 'qzw187027'
    },
    security: {
        secretKey: 'abcdefg',
        expiresIn: 60 * 60 * 24 * 60
    },
    wx: {
        appId: 'wx915d2b0d4b32a46d',
        appSecret: '0b9ccefd7a5595bbc0b6b97997e38531',
        loginUrl: 'https://api.weixin.qq.com/sns/jscode2session?appid=%s&secret=%s&js_code=%s&grant_type=authorization_code',
    }
}
