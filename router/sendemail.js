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
    //3.配置发送邮件的信息
    let mailOptions = {
        from: 'socialnorms@vip.qq.com', // 发送者
        to: req.query.email, // 传过来的邮箱
        subject: '注册验证', // 邮件标题
        html: randonemail()
    };

    //4.发送邮件
    transporter.sendMail(mailOptions, function (err, data) {
        //回调函数，用于判断邮件是否发送成功
        if (err) {
            console.log('发送异常' + err)
        } else {
            console.log('发送成功')
            let data = {
                code: 200,
                msg: 'success'
            }
            res.send(data)
        }

    })

})
// 导出模块
module.exports = router