const express = require('express')
const router = express.Router()
const nodemailer = require('nodemailer');
router.get('/email', (req, res) => {
    //2. 创建运输对象
    let transporter = nodemailer.createTransport({
        host: 'smtp.qq.com',
        secure: true,
        port: 465,
        auth: {
            user: 'socialnorms@vip.qq.com', //qq邮箱账号
            pass: 'ntjbavypllieecej' //邮箱的授权码
        }
    })
    // 生成随机验证码
    function randonemail() {
        var code = ''
        for (let i = 0; i < 6; i++) {
            code += Math.floor(Math.random() * 10)
        }
        return code
    }
    var code=randonemail()
    //3.配置发送邮件的信息
    let mailOptions = {
        from: 'socialnorms@vip.qq.com', // 发送者
        to: req.query.email, // 传过来的邮箱
        subject: '注册验证', // 邮件标题
        html: '您的验证码为：<b>'+code+'</b>,请妥善保管！'
    };
     // 对字符串进行加密
    function compileStr(code) {
        // 进行字符的转换
        var c = String.fromCharCode(code.charCodeAt(0) + code.length)
        for (var i = 1; i < code.length; i++) {
          c += String.fromCharCode(code.charCodeAt(i) + code.charCodeAt(i - 1))
        }
        return escape(c)
      }
    //4.发送邮件
    transporter.sendMail(mailOptions, function (err, data) {
        //回调函数，用于判断邮件是否发送成功
        if (err) {
            console.log('发送异常' + err)
        } else {
            console.log('发送成功')
            let data = {
                code: 200,
                msg: 'success',
                emailcode:compileStr(code)
            }
            res.send(data)
        }

    })

})
// 导出模块
module.exports = router