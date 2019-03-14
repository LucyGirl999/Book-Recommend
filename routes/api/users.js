// login & register
// 引入express模块
const express = require('express')
// 调用express中的router方法
const router = express.Router();
// 引入加密模块
const bcrypt = require('bcrypt-node')
// 引入全球公认头像gravatar
const gravatar = require('gravatar')
// 引入jsonwebtoken模块，用于生成jsonwebtoken
const jwt = require('jsonwebtoken')
// 引入passport
const passport = require('passport')

// 把数据model中的User.js引入进来
const User = require('../../model/User');
// 将参数secretOrKey从conf的keys中引进来
const key = require('../../conf/keys')

// $route GET /api/users/test
// @desc 返回一个请求的json数据
// @assecc 判断是否暴露 public
// 使用router的get()，创建登录和注册的接口，并且返回一个json数据
router.get("/test",(req,res) => {
    res.json({msg:"users api"})
})

// $route POST /api/users/register
// @desc 返回一个请求的json数据
// @assecc 判断是否暴露 public
router.post("/register",(req,res) => {
    // console.log(req.body);
    // console.log(req.body);

    // 在数据库中查询数据
    // 逻辑如下：
    // 从数据库中查询从前端发送过来的数据，判断这个数据是否在数据库中存在，如果存在，返回状态码及json数据
    // 如果不存在，那么实例化一个User，将前端发送过来的数据保存在newUser中去
    // 使用bcrypt第三方库对password进行加密，在window中npm install bcrypt-node,否则安装不成功
    // 在没有报错下，是的password=hash值，并将newUser进行保存。
    User.findOne({name: req.body.name})
                .then((user) => {
                    // console.log("user:" + user);
                    if(user){
                        return res.status(400).json("账号已被注册");
                    }
                    else{
                       
                        const avatar = gravatar.url(req.body.email,{s: 200,r: "pg",d:"mm"})
                        
                        const newUser = new User({
                            name: req.body.name,
                            password: req.body.password,
                            tel: req.body.tel,
                            identity: req.body.identity,
                            avatar,
                        })
                       
                        // 密码加密
                        bcrypt.genSalt(10, function(err, salt) {
                            bcrypt.hash(newUser.password, salt,null, (err, hash) => {
                               if(err) throw err;

                                newUser.password = hash;

                                newUser.save()
                                       .then(user => {res.json(user)})
                                       .catch(err => console.log(err))
                            });
                        });
                    }
                })
})
// $route POST api/users/login
// @desc 返回一个token

router.post("/login",(req,res) => {
    const name = req.body.name;
    const password = req.body.password;

    // 查询数据库，看数据库中是否存在该项
    User.findOne({name})
        .then(user => {
            if(!user){
                return res.status(404).json({name: "该账号未被注册！"})
            }
            // 进行密码匹配
            bcrypt.compare(password,user.password,(err,res) => {
                if(err) throw err;
                const pwdMatchFlag = res;
                tryLogin(pwdMatchFlag);
            });
            function tryLogin(pwdMatchFlag){
                if(pwdMatchFlag){
                    // sign()函数内的参数为：rule,screct,过期时间,箭头函数
                    const rule = {
                        id:user.id,
                        name:user.name,
                        identity: user.identity
                    };
                    jwt.sign(rule,key.secretOrKey,{expiresIn: 3600},(err,token) => {
                        if(err) throw err;
                        res.json({
                            success: true,
                            token: "Bearer " + token
                        })
                    })
                    // res.json({msg:"Success"})
                }
                else{
                    return res.status(400).json("密码错误！")
                }
            }
        })
})


// $route GET api/users/current 当前用户请求的信息
// @desc return current info
// Private
router.get('/current', passport.authenticate('jwt',{session:false}), (req,res) => {
    // res.json(req.user);
    res.json({
        id: req.user.id,
        name:req.user.name,
        tel: req.user.tel,
        identity: req.user.identity
    })
})

// 将router暴露出去
module.exports = router;