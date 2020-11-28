/**
 * 数据库链接的代码
 */
const Sequelize = require('sequelize');
const { dbName, host, port, user, password } = require('../config/config').database;

const sequelize = new Sequelize(dbName, user, password, {
    dialect: 'mysql',
    host,
    port,
    // loging: true,//  原生sql
    timezone: '+08:00', //时区
    define: {
        // timestamps:false,
        paranoid: true,
        createdAt: 'created_at',
        updatedAt: 'updated_at',
        deletedAt: 'deleted_at',
        underscored: true
    }
})

sequelize.sync({
    // force: true//添加新的字段时候会清空表，再新建表
});

module.exports = {
    sequelize
}
