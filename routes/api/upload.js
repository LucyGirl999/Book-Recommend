const express = require('express');
const fs = require('fs');
const router = express.Router();
const sd = require('silly-datetime');
// const formidable = require('formidable');
const multer = require('multer');

router.get('/', (req, res) => {
    console.log("测试成功");
})
let storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './client/src/assets/upload')
    },
    filename: (req, file, cb) => {
        let imagename = file.originalname;
        let t = new Date().getFullYear() + (new Date().getMonth()+1) + new Date().getDate();
        let ran = parseInt(Math.random() * 8999 + 10000);
        let newName = `${t}${ran}${imagename}`;
        // 生成新的片名字
        // let newName = `${t}${ran}${imagename}`;
        cb(null, newName);
    }
})
let upload = multer({
    storage: storage
});

// let uploadImg = ()
router.post('/', upload.single("image"), (req, res, next) => {
    console.log(req.file.filename);
//     let imagename = req.file.originalname;
//     // console.log(req.file);
//    let t = new Date().getFullYear() + (new Date().getMonth()+1) + new Date().getDate();
//    let ran = parseInt(Math.random() * 8999 + 10000);
//    let newName = `${t}${ran}${imagename}`;
   let  url =  '/'+req.file.filename;

    console.log(url +'hhehehehe');
    res.json({
        status: 0,
        msg: "图片上传成功",
        imageUrl: url

    })


})

module.exports = router;

// let AVATAR_UPLOAD_FOLDER = '/avatar'

//     // 创建上传表单
//     let form = new formidable.IncomingForm();
//     // 设置编码格式
//     form.encoding = 'utf-8';
//     // 设置传目录
//     form.uploadDir = './upload' + AVATAR_UPLOAD_FOLDER;
//     // 保留后缀
//     form.keepExtensions = true;
//     // 文件大小
//     form.maxFieldsSize = 2 * 1024 * 1024;

//     // form.parse(req,[cb])
//     form.parse(req, (err, fields, files) => {

//         console.log(files);
//         console.log(files.thumbnail.name);
//         if (err) {
//             return res.json({
//                 status: '500',
//                 msg: "服务器内部错误",
//                 result: ''
//             })
//         }
//         // 限制文件大小 单位默认字节 这里限制的大小为2M
//         if (files.ful.size > form.maxFieldsSize) {
//             return res.json({
//                 status: '1',
//                 msg: "文件大小不能超过2M",
//                 result: ''
//             })
//         }

//         // 后缀名判断
//         let extName = '';
//         switch (files.ful.type) {
//             case 'image/pjpeg':
//                 extName = 'jpg';
//                 break;
//             case 'image/jpeg':
//                 extName = 'jpg';
//                 break;

//             case 'image/png':
//                 extName = 'png';
//                 break;
//             case 'image/x-png':
//                 extName = 'png';
//                 break;
//         }
//         if(extName.length == 0) {
//             return res.json({
//                 status: '1',
//                 msg: "只支持png和jpg格式的图片",
//                 result: ''
//             })
//         }
//         // 使用第三方模块silly-datetime重命名图片
//         let t = sd.format(new Date(), 'YYYYMMDDHHmmss');
//         // 生成随机数与t生成新的图片命名
//         let ran = parseInt(Math.random() * 8999 + 10000);
//         // 生成新的片名字
//         let newName = `${t}_${ran}.${extName}`;
//         // 新的图片路劲
//         let newPath = form.uploadDir + '/' + newName;
//         // 更改名字和路径
//         fs.rename(files.ful.path,newPath,(err) => {
//             if(err) {
//                 return res.json({
//                     "code": 401,
//                     "message": "图片上传失败"
//                 })
//             }
//             else {
//                 return res.json({
//                     status: 0,
//                     result: {
//                         data:AVATAR_UPLOAD_FOLDER + '/' + newName
//                     }
//                 })
//             }
//         })
//     })
//