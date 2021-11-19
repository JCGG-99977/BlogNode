const express = require('express');
const connection = require('../mysql/mysql')
const router = express.Router();
// 个人信息查询
router.get('/dg_msg/user', (req, res) => {
    const sql = 'SELECT * FROM user_register_table Where id=?'
    const params = req.query.id
    connection.query(sql, params, function(err, result) {
        if (err) {
            console.log(err.message);
            return;
        } else {
            let data = {
                code: 200,
                result: result,
            }
            res.send(data);
        }
    });
})
// 查询所有的用户
router.get('/all/user', (req, res) => {
    const sql = 'SELECT * FROM user_register_table '
    const params = req.query.id
    connection.query(sql, params, function(err, result) {
        if (err) {
            console.log(err.message);
            return;
        } else {
            let data = {
                code: 200,
                result: result,
            }
            res.send(data);
        }
    });
})
module.exports=router