const express = require('express');
const connection = require('../mysql/mysql')
const router = express.Router();
// 个人反馈历史查询
router.get('/search_userfeeb', (req, res) => {
    const sql = 'SELECT * FROM user_feedback_table Where user_id=?'
    const params = req.query.user_id
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
// 个人反馈历史插入数据
router.post('/insert_userfeeb',(req,res)=>{
    const sql="INSERT INTO user_feedback_table(id,user,type,content,time,email,user_id) VALUES(?,?,?,?,?,?,?)"
    // 随机ID
    var chars = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
    function generateMixed(n) {
        var res = "";
        for (var i = 0; i < n; i++) {
            var id = Math.ceil(Math.random() * 35);
            res += chars[id];
        }
        return res;
    }
    const params=[generateMixed(6),req.body.user,req.body.type,req.body.content,req.body.time,req.body.email,req.body.user_id]
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