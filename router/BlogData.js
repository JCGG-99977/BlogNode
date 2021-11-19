const express = require('express');
const connection = require('../mysql/mysql')
const router = express.Router();

// 博客的增加，id作为唯一标准，随机生成
router.post('/insert_blog', (req, res) => {
    const sql = "INSERT INTO user_blog_table(id,user,title,content,user_dz,user_see,user_zf,content_type,data_time,status,see_content,user_id,reprint_url) VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?)"
    var chars = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
    function generateMixed(n) {
        var res = "";
        for (var i = 0; i < n; i++) {
            var id = Math.ceil(Math.random() * 35);
            res += chars[id];
        }
        return res;
    }
    var Params = [generateMixed(6),req.body.user, req.body.title, req.body.content, req.body.user_dz, req.body.user_see, req.body.user_zf, req.body.content_type, req.body.data_time,req.body.status,req.body.see_content,req.body.user_id,req.body.reprint_url];
    console.log(Params)
    connection.query(sql, Params, function(err, result) {
        if (err) {
            console.log('[INSERT ERROR] - ', err.message);
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
// 进行博客个人查询
router.get('/see_user_blog', (req, res) => {
    var sql = 'SELECT id,user,title,see_content,user_dz,user_see,content_type,data_time,status,user_zf FROM user_blog_table Where user_id=? AND status!=3'
    const params = req.query.user_id
    //查
    connection.query(sql,params, function (err, result) {
        if (err) {
            console.log('[SELECT ERROR] - ', err.message);
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
// 帖子查询分享
router.get('/share/see_user_blog', (req, res) => {
    var sql = 'SELECT * FROM user_blog_table Where id=?'
    const params = req.query.id
    //查
    connection.query(sql,params, function (err, result) {
        if (err) {
            console.log('[SELECT ERROR] - ', err.message);
            return;
        } else {
            let count=result[0].user_see
            count+=1
            var sqladd = 'UPDATE user_blog_table SET user_see = ? WHERE Id = ?';
            const params = [count,req.query.id]
            //增
            connection.query(sqladd,params, function (err, result) {
                if (err) {
                    console.log('[SELECT ERROR] - ', err.message);
                    return;
                } else {
                    console.log('OK')
                }
            });
            let data = {
                code: 200,
                result: result,
            }
            res.send(data);
        }
    });
})
// 博客所有数据查询
router.get('/all/seeblog', (req, res) => {
    var sql = 'SELECT * FROM user_blog_table'
    //查
    connection.query(sql, function (err, result) {
        if (err) {
            console.log('[SELECT ERROR] - ', err.message);
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
// 删除个人博客
router.post('/del_user_blog', (req, res) => {
    var sql = 'UPDATE user_blog_table SET status = 3 WHERE Id = ?';
    const params = req.body.id
    //查
    connection.query(sql,params, function (err, result) {
        if (err) {
            console.log('[SELECT ERROR] - ', err.message);
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
// 管理员操作文章
router.post('/user_admin/change_user_blog', (req, res) => {
    var sql = 'UPDATE user_blog_table SET status = ? WHERE Id = ?';
    const params = [req.body.status,req.body.id]
    connection.query(sql,params, function (err, result) {
        if (err) {
            console.log('[SELECT ERROR] - ', err.message);
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
// 用户模糊查询博客
router.get('/search/see_user_blog', (req, res) => {
    var sql = "SELECT * FROM user_blog_table WHERE title REGEXP ? AND status=1"
    const params = req.query.title
    //查
    connection.query(sql,params, function (err, result) {
        if (err) {
            console.log('[SELECT ERROR] - ', err.message);
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