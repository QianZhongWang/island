const { sequelize } = require('../../core/db');

const { Sequelize, DataTypes, Model } = require('sequelize');

class User extends Model {

}

/* 给数据库表设置类型 */
User.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,  // 主键
    autoIncrement: true
  },
  nickname: DataTypes.STRING,
  email: DataTypes.STRING,
  password: DataTypes.STRING,
  openid: {
    type: DataTypes.STRING, // 字符串类型
    unique: true //是否唯一
  },

}, {
  sequelize,
  modelName: 'User',
  tableName: 'user'
})


