const express=require('express')
const multiparty=require('multiparty')
const fs=require('fs')
const router=express.Router()
router.post('/upload',(req,res)=>{
  /* 生成multiparty对象，并配置上传目标路径 */
  let form = new multiparty.Form();
  /* 设置编辑 */
//   form.encoding = 'utf-8';
  //设置文件存储路劲
  form.uploadDir = './public';

  //设置文件大小限制
  // form.maxFilesSize = 1 * 1024 * 1024;
  form.parse(req, function (err, fields, files) {
    try {
      let inputFile = files.file[0];
      let uploadedPath = inputFile.path;
      let newPath = form.uploadDir + "/" + inputFile.originalFilename;
      //同步重命名文件名 fs.renameSync(oldPath, newPath)
      fs.renameSync(inputFile.path, newPath);
      let data={
          code:200,
          url:'http://192.168.1.80:3333/static/'+inputFile.originalFilename
      }
      res.send(data);
    } catch (err) {
      console.log(err);
      res.send({ err: "上传失败！" });
    };
  })
})
module.exports=router