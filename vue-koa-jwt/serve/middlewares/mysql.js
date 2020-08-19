const mysql = require('mysql')
// import tools from './tools.js'
const tools = require('./tools')
const pool = mysql.createPool({
  host: '127.0.0.1', // 数据库地址
  user: 'root', // 数据库用户
  password: '123456', // 数据库密码
  database: 'myshop' // 选中数据库
})

const query = function(sql, values) {
  return new Promise((resolve, reject) => {
    pool.getConnection(function(err, connection) {
      if (err) {
        reject(err)
      } else {
        connection.query(sql, values, (err, rows) => {
          if (err) {
            reject(err)
          } else {
            const json = tools.filterUnderLine(rows)
            resolve(json)
          }
          connection.release()
        })
      }
    })
  })
}

module.exports = { query }

// // 执行sql脚本对数据库进行读写
// connection.query('SELECT * FROM my_table', (error, results, fields) => {
//   if (error) throw error
//   // connected!

//   // 结束会话
//   connection.release()
// })
