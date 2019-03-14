const express = require('express')
const router = express.Router();
const passport = require('passport')
const Recommend = require("../../model/Recommend");
// const qs = require('querystring');
// const url = require('url')
const Until = require('../../until/until');


// $route GET /api/recommend/test

router.get("/test", (req, res) => {
    res.json({
        msg: "Recommend is worked"
    })
})

// $rout POST /api/recommend/reader

router.post("/reader", passport.authenticate("jwt", {
    session: false
}), (req, res) => {
    const readerRecommend = {};

    if (req.body.student) readerRecommend.student = req.body.student;
    if (req.body.email) readerRecommend.email = req.body.email;
    if (req.body.collage) readerRecommend.collage = req.body.collage;
    if (req.body.bookName) readerRecommend.bookName = req.body.bookName;
    if (req.body.language) readerRecommend.language = req.body.language;
    if (req.body.author) readerRecommend.author = req.body.author;
    if (req.body.ISBN) readerRecommend.ISBN = req.body.ISBN;
    if (req.body.house) readerRecommend.house = req.body.house;
    if (req.body.reason) readerRecommend.reason = req.body.reason;
    if (req.body.data) readerRecommend.data = req.body.data;
    if (req.body.state) readerRecommend.state = req.body.state;
    //if(req.body.status) readerRecommend.status = req.body.status;

    new Recommend(readerRecommend).save().then(recommends => {
            res.json(recommends);
        })
        .catch(err => console.log(err))
})

// 获取前台传过来的参数 pageSize:每页显示的条数，skipPage:跳转到某页面显示的页数
//  let num = parseInt(req.query.pageSize);
//  let skipPage = parseInt(req.query.pageSize);
//  console.log(num,skipPage);
//  // let arg = url.parse(req.url,true).query;
//  let arg = req.query.state;
//  let json = {state: arg};
//  console.log(json);
//  console.log(arg);

// $route GET /api/recommend  获取所有的
router.get('/', passport.authenticate("jwt", {
    session: false
}), (req, res) => {
    let arg = req.query.state;
    let arg2 = req.query.student;
    let json = {
        state: arg
    };
    let json2 = {student:arg2}
    let page = Number(req.query.skipPage) || 1;
    let pageSize = Number(req.query.pageSize) || 5;
    let skip = ((page - 1) * pageSize);
    let total = 0;
    Recommend.find(json)
        .then(date => {
            if (!date) {
                return res.status(404).json("没有查询到数据！")
            } else {
                return date
            }
        }).then((date) => {
            total = date.length;
            let SortRecommend = Recommend.find(json).sort({
                data: '-1'
            });
            let SkipRecommend = SortRecommend.skip(skip).limit(pageSize);
            SkipRecommend.exec((err, doc) => {
                if (err) {
                    res.json({
                        status: '1',
                        meg: err.message
                    })
                } else {
                    // console.log(doc);
                    res.json({
                        status: '0',
                        msg: '',
                        result: {
                            count: doc.length,
                            list: doc,
                            total: total

                        }
                    })
                }
            })
        })
})


router.get('/student', passport.authenticate("jwt", {
    session: false
}), (req, res) => {
    // let arg = req.query.state;
    let arg2 = req.query.student;
    // let json = {
    //     state: arg
    // };
    let json2 = {student:arg2}
    let page = Number(req.query.skipPage) || 1;
    let pageSize = Number(req.query.pageSize) || 5;
    let skip = ((page - 1) * pageSize);
    let total = 0;
    Recommend.find(json2)
        .then(date => {
            if (!date) {
                return res.status(404).json("没有查询到数据！")
            } else {
                return date
            }
        }).then((date) => {
            total = date.length;
            let SortRecommend = Recommend.find(json2).sort({
                data: '-1'
            });
            let SkipRecommend = SortRecommend.skip(skip).limit(pageSize);
            SkipRecommend.exec((err, doc) => {
                if (err) {
                    res.json({
                        status: '1',
                        meg: err.message
                    })
                } else {
                    // console.log(doc);
                    res.json({
                        status: '0',
                        msg: '',
                        result: {
                            count: doc.length,
                            list: doc,
                            total: total

                        }
                    })
                }
            })
        })

    })

// 根据条件查询数据
router.get('/search',passport.authenticate("jwt",{session:false}),(req,res) => {
    console.log(req.query)
    let key = req.query.select;
    let value = req.query.value;
    console.log(key,value);
    let data = {};
    data[key] = value;

    console.log(data);
    Recommend.find(data)
              .then(books => {
                  if(!books) {
                      return res.status(404).json('没有查询到数据！')
                  }
                  let total = books.length;
                  return res.json({
                      formData:books,
                      total:total
                  })
              })
              .catch(err => console.log(err))

})

// $router POST /api/recommend/edit
router.post('/edit/:id', passport.authenticate("jwt", {
    session: false
}), (req, res) => {
    const readerRecommend = {};

    if (req.body.student) readerRecommend.student = req.body.student;
    if (req.body.email) readerRecommend.email = req.body.email;
    if (req.body.collage) readerRecommend.collage = req.body.collage;
    if (req.body.bookName) readerRecommend.bookName = req.body.bookName;
    if (req.body.language) readerRecommend.language = req.body.language;
    if (req.body.author) readerRecommend.author = req.body.author;
    if (req.body.ISBN) readerRecommend.ISBN = req.body.ISBN;
    if (req.body.house) readerRecommend.house = req.body.house;
    if (req.body.reason) readerRecommend.reason = req.body.reason;
    if (req.body.data) readerRecommend.data = req.body.data;
    if (req.body.state) readerRecommend.state = req.body.state;
    //if(req.body.status) readerRecommend.status = req.body.status;

    Recommend.findByIdAndUpdate({
        _id: req.params.id
    }, {
        $set: readerRecommend
    }, {
        new: 'true'
    }).then(recommends => {
        res.json(recommends)
    })

})
module.exports = router;
