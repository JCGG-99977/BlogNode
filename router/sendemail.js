const express = require('express')
const router = express.Router()
const nodemailer = require('nodemailer');
// 获取验证码
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
            console.log(code)
            res.send(data)
        }

    })

})
// 反馈恢复
router.get('/feeb_back/email', (req, res) => {
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
    //3.配置发送邮件的信息
    let mailOptions = {
        from: 'socialnorms@vip.qq.com', // 发送者
        to: req.query.email, // 传过来的邮箱
        subject: '反馈回复', // 邮件标题
        html: `尊敬的<b>${req.query.user}</b>:<br>您的建议我们已经收到，感谢您的反馈，我们会尽快处理您的问题，感谢您的支持！<br>来自管理员：<b>叫做长大</b>的回复`
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
                msg: 'success',
            }
            res.send(data)
        }
    })
})
// 消息提示
router.post('/cover_user/feeb_back/email', (req, res) => {
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
    //3.配置发送邮件的信息
    let mailOptions = {
        from: 'socialnorms@vip.qq.com', // 发送者
        to: '1848514604@qq.com', // 传过来的邮箱
        subject: '用户反馈', // 邮件标题
        html: `系统提示：<br>用户：<b>${req.body.user}</b>反馈了一条类型为：<b>${req.body.type}</b>的消息，具体内容为：${req.body.content} `
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
                msg: 'success',
            }
            res.send(data)
        }
    })
})
// 删除用户回复邮件
router.post('/del_blog/email', (req, res) => {
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
    //3.配置发送邮件的信息
    let mailOptions = {
        from: 'socialnorms@vip.qq.com', // 发送者
        to: req.body.email, // 传过来的邮箱
        subject: '删除回复', // 邮件标题
        html: `尊敬的<b>${req.body.user}</b>:<br>您的博文由于：<b>${req.body.text}</b>，已经被删除，请您留意，期待您更好的作品,有疑问请联系最高管理员（1848514604@qq.com）<br>来自管理员：<b>叫做长大</b>的回复`
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
                msg: 'success',
            }
            res.send(data)
        }
    })
})
// 删除用户博文管理员回复邮件
router.post('/admin_all/del_blog/email', (req, res) => {
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
    //3.配置发送邮件的信息
    let mailOptions = {
        from: 'socialnorms@vip.qq.com', // 发送者
        to: '1848514604@qq.com', // 传过来的邮箱
        subject: '删除回复', // 邮件标题
        html: `管理员ID为：<b>${req.body.id}</b><br>删除了用户<b>${req.body.user}</b>标题为:<b>${req.body.title}</b>的内容，原因是：<br><b>${req.body.text}</b>，<br>请留意！！！`
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
                msg: 'success',
            }
            res.send(data)
        }
    })
})
// 导出模块
module.exports = router