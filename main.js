// 引入express框架
const express=require('express')
// 解决跨域使用
const cors=require('cors')
// post请求传参使用
const Parser=require('body-parser')
// 实例化一个
const app=express()
// 解决跨域问题
app.use(cors());
// parse application/x-www-form-urlencoded
app.use(Parser.urlencoded({
  extended: false
}));
// parse application/json
app.use(Parser.json());

//设置跨域访问
app.all('*', function (req, res, next) {
res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "content-type");
  res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
  res.header("X-Powered-By", ' 3.2.1')
  res.header("Content-Type", "application/json;charset=utf-8");
  next();
})
// 邮箱验证
const email=require('./router/sendemail')
app.use(email)
app.use('/',(req,res)=>{
    res.send('请求正常，可正常使用！返回值：OK')
})
app.listen('3333','0.0.0.0',(res)=>{
    console.log('Server running 127.0.0.1:3333')
})