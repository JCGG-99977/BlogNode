const express = require('express');
const connection = require('../mysql/mysql')
const router = express.Router();
// 登录
router.get('/login', (req, res) => {
    const sql = 'SELECT * FROM user_register_table Where user=? AND pwd=?'
    const params = [req.query.user,req.query.pwd]
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
// 注册
router.post('/login',(req,res)=>{
    const sql='INSERT INTO user_register_table(id,user,pwd,power,time,user_img,del_on,nickname,introduction,email,emailcode) VALUES(?,?,?,?,?,?,?,?,?,?,?)'
    var chars = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
    function generateMixed(n) {
        var res = "";
        for (var i = 0; i < n; i++) {
            var id = Math.ceil(Math.random() * 35);
            res += chars[id];
        }
        return res;
    }
    const params=[generateMixed(6),req.body.user,req.body.pwd,'0',req.body.time,'http://180.76.135.143:3333/static/bac.jpeg','0',req.body.user,'暂无简介，...',req.body.email,req.body.emailcode]
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