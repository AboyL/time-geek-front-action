const Sequelize = require('sequelize')
const config = {
  database: 'test', // 使用哪个数据库
  username: 'root', // 用户名
  password: 'test', // 口令
  host: 'week7-mysql', // 主机名
  port: 3306 // 端口号，MySQL默认3306 docker里面暴露出来为3333
  // host: '127.0.0.1', // 主机名
  // port: 3333 // 端口号，MySQL默认3306 docker里面暴露出来为3333
}


const sequelize = new Sequelize(config.database, config.username, config.password, {
  host: config.host,
  port:config.port,
  dialect: 'mysql',
  // 连接池
  pool: {
    max: 5,
    min: 0,
    idle: 30000
  }
})

module.exports = sequelize