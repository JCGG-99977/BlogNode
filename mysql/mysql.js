const mysql = require('mysql')
const connection = mysql.createConnection({
    host: '', //地址
    user: 'grow_up_table',  //用户名
    password: '',   //密码
    port: '3306',
    database: 'grow_up_table'
});
module.exports = connection;