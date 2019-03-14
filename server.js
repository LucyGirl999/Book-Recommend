const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
// 引进token验证的passport
const passport = require('passport')
const app = express();
const fs = require('fs')
// const router = express.Router();
// db conf
const db = require("./conf/keys").mongodbURL;



// 引入users.js文件
const users = require('./routes/api/users')
// 引入发布图书接口
const publicBook = require('./routes/api/publicBook')
// 引入recommend.js文件
const recommend = require('./routes/api/recommend')

// 上传图片
const upload = require('./routes/api/upload')

// // 引入图书荐购的分页
// const PageRecommend = require('./routes/api/PageShowRecommend')

app.all('*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
    res.header("X-Powered-By",' 3.2.1')
    res.header("Content-Type", "application/json;charset=utf-8");
    next();
});

// connect to mongodb
mongoose.connect(db, {useNewUrlParser:true})
            .then(() => console.log("MongoDb connect success"))
            .catch(err => console.log(err))


            // 使用中间件初始化passport
app.use(passport.initialize());
// 将passport传递过去，就不用在此文件夹中再次引用了
require("./conf/passport")(passport);



// app.get('/',(req,res) => {
//     res.send("Hello World!!!")
// })


// 使用body-parser中间件
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());


// 用中间件使用router
app.use("/api/users", users);
app.use("/api/publicBook", publicBook);
app.use("/api/recommend", recommend);
app.use("/api/upload", upload);
// app.use('/api/PageRecommend', PageRecommend.PageShowRecommend);


// module.exports = router;
//定义一个端口号，本地时使用端口号5000
const port = process.env.PORT || 25000;

// app实例监听端口号，参入的参数为端口号及一个处理函数
app.listen(port,() => {
    console.log(`Server running on port ${port}`);
})