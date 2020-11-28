const bcrypt = require('bcryptjs');

const {sequelize} = require('../../core/db');
const {throwNotFound, authorization} = require('../lib/helper')
const {Sequelize, DataTypes, Model} = require('sequelize');

class User extends Model {
    static async verifyEmailPassword(email, plainPassword) {
        const user = await User.findOne({
            where: {
                email: email,
            }
        })
        if (!user) {
            throwNotFound('账户不存在')
        }
        const correct = bcrypt.compareSync(plainPassword, user.password)
        if (!correct) {
            authorization('密码不正确')
        }
        return user;
    }

    static async getUserByOpenid(openid) {
        return await User.findOne({
            where: {
                openid: openid
            }
        })
    }

    static async registerByOpenid(openid) {
        return await User.create({
            openid
        })
    }
}

/* 给数据库表设置类型 */
User.init({
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,  // 主键
        autoIncrement: true
    },
    nickname: Sequelize.STRING,
    email: {
        type: Sequelize.STRING,
        unique: true
    },
    password: {
        type: Sequelize.STRING,
        set(val) {
            const salt = bcrypt.genSaltSync(10);
            const pwd = bcrypt.hashSync(val, salt);
            this.setDataValue('password', pwd);


        }
    },
    openid: {
        type: Sequelize.STRING, // 字符串类型
        unique: true //是否唯一
    },

}, {
    sequelize,
    modelName: 'User',
    tableName: 'user'
})

module.exports = {
    User
}
