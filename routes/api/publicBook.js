// login & register
// 引入express模块
const express = require('express')
// 调用express中的router方法
const router = express.Router();
// 引入passport
const passport = require('passport')


// 把数据model中的User.js引入进来
const PublicBook = require('../../model/PublicBook');
// 将参数secretOrKey从conf的keys中引进来
// const key = require('../../conf/keys')

// $route GET /api/users/test
// @desc 返回一个请求的json数据
// @assecc 判断是否暴露 public
router.get('/test',(req,res) => {
    res.json({msg:"PublicBook worked"})
})

// $route POST /api/publicBook/publices
// @desc  提交发布新书
// @access Prviate
router.post('/publices',passport.authenticate("jwt",{session:false}),(req,res) => {
    const booksFields = {};
    console.log(req);
    if(req.body.bookName) booksFields.bookName = req.body.bookName;
    if(req.body.bookType) booksFields.bookType = req.body.bookType;
    if(req.body.ISBN) booksFields.ISBN = req.body.ISBN;
    if(req.body.house) booksFields.house = req.body.house;
    if(req.body.collect) booksFields.collect = req.body.collect;
    if(req.body.type) booksFields.type = req.body.type;
    if(req.body.author) booksFields.author = req.body.author;
    if(req.body.pageNumber) booksFields.pageNumber = req.body.pageNumber;
    if(req.body.content) booksFields.content = req.body.content;
    if(req.body.language) booksFields.language = req.body.language;
    if(req.body.imageUrl) booksFields.img = req.body.imageUrl;
    if(req.body.remarks) booksFields.remarks = req.body.remarks;
    if(req.body.date) booksFields.date = req.body.date;
    console.log(booksFields.img)
    new PublicBook(booksFields).save().then(books => {
        res.json(books);
    })
})

// $route POST /api/publicBook/edit:id
// @desc  编辑发布新书 
// @access Prviate
router.post('/edit/:id',passport.authenticate("jwt",{session:false}),(req,res) => {
    const booksFields = {};
    console.log(req);
    if(req.body.bookName) booksFields.bookName = req.body.bookName;
    if(req.body.bookType) booksFields.bookType = req.body.bookType;
    if(req.body.ISBN) booksFields.ISBN = req.body.ISBN;
    if(req.body.house) booksFields.house = req.body.house;
    if(req.body.collect) booksFields.collect = req.body.collect;
    if(req.body.type) booksFields.type = req.body.type;
    if(req.body.author) booksFields.author = req.body.author;
    if(req.body.pageNumber) booksFields.pageNumber = req.body.pageNumber;
    if(req.body.content) booksFields.content = req.body.content;
    if(req.body.language) booksFields.language = req.body.language;
    if(req.body.imageUrl) booksFields.img = req.body.imageUrl;
    if(req.body.remarks) booksFields.remarks = req.body.remarks;
    if(req.body.date) booksFields.date = req.body.date;

    PublicBook.findOneAndUpdate(
            {_id: req.params.id},
            {$set: booksFields},
            {new: true}
        ).then(books => {
            console.log(books);
            res.json(books);
        })
})

// $router DELETE /api/publicBook/delete:id
// @desc  删除发布的新书接口

router.delete("/delete/:id", passport.authenticate("jwt",{session:false}),(req,res) => {
    PublicBook.findOneAndRemove({_id: req.params.id})
              .then(books => {
                  books.save().then(books => {res.json(books)})
              }).catch(err => res.status(404).json("删除失败"))
})

// 查询所有的数据
router.get('/',passport.authenticate("jwt",{session:false}),(req,res) => {
    let page = Number(req.query.skipPage) || 1;
    let pageSize = Number(req.query.pageSize) || 5;
    console.log(pageSize);
    console.log(page);
    let skip = ((page -1)*pageSize);
    let total = 0;
    PublicBook.find()
              .then(books => {
                  if(!books) {
                      return res.status(404).json("没有查询到数据！")
                  }
                  return books;
              }).then((books) => {
                  total = books.length;
                  let c = ['31',"32","322"];
                  console.log(total);
                  PublicBook.find().skip(skip).limit(pageSize).exec((err,date) => {
                    if(err){
                        res.json({
                            status:'1',
                            meg:err.message
                        })
                    }else{
                        // console.log(doc);
                        res.json({
                            status:'0',
                            msg:'',
                            result:{
                                count:date.length,
                                list:date,
                                total:total
                                
                            },
                            
                        })
                    }
                  })
              })
              .catch(err => console.log(err))
})

// 根据条件查询数据，某一个条件的数据 
// /api/publicBook/search
router.get('/search',passport.authenticate("jwt",{session:false}),(req,res) => {
    console.log(req.query)
    let key = req.query.select;
    let value = req.query.value;
    console.log(key,value);
    let data = {};
    data[key] = value;

    console.log(data);
    PublicBook.find(data)
              .then(books => {
                  if(!books) {
                      return res.status(404).json('没有查询到数据！')
                  }
                  let total = books.length;
                  return res.json({
                      books:books,
                      total:total
                  })
              })
              .catch(err => console.log(err))

})

// /api/publicBook/newbooks
router.get('/newbooks',passport.authenticate("jwt",{session:false}),(req,res) => {
    console.log(req.query)
    let key = req.query.select;
    let value = req.query.value;
    let limit =Number(req.query.limit);
    console.log(key,value);
    let data = {};
    data[key] = value;

    console.log(data);
    PublicBook.find(data)
              .then(books => {
                  if(!books) {
                      return res.status(404).json('没有查询到数据！')
                  }
                 return books;
              }).then((books) => {
                  PublicBook.find(data).limit(limit).exec((err,data) => {
                      console.log(data)
                    if(err){
                        res.json({
                            status:'1',
                            meg:err.message
                        })
                    }else{
                        console.log(data + "data");
                        // console.log(doc);
                        res.json(data);
                    }
                  })
                  
              })
              .catch(err => console.log(err))

})

// /api/publicBook/searchResult
router.get('/searchResult',passport.authenticate("jwt",{session:false}),(req,res) => {
    console.log(req.query)
    let key = req.query.props;
    console.log(key);
    let reg = new RegExp("^" + key ,'i');
    let json = {$regex:reg};

    let page = Number(req.query.skipPage) || 1;
    let pageSize = Number(req.query.pageSize) || 5;
    console.log(pageSize);
    console.log(page);
    let skip = ((page -1)*pageSize);
    let total = 0;

    PublicBook.find({"$or": [{"bookName":json},{"author": json},{"ISBN":json},{"house":json}]})
              .then(books => {
                  if(!books) {
                      return res.status(404).json('没有查询到数据！')
                  }
                  
                 return books;
              }).then(books => {
                  total = books.length;
                  PublicBook.find({"$or": [{"bookName":json},{"author": json},{"ISBN":json},{"house":json}]}).limit(pageSize).skip(skip).exec((err,data) => {
                    if(err){
                        res.json({
                            status:'1',
                            meg:err.message
                        })
                    }else{
                        console.log(data + "data");
                        // console.log(doc);
                        res.json({
                            books: data,
                            total: total
                        });
                    }
                  })
              })
              .catch(err => console.log(err))

})

// 将router暴露出去
module.exports = router;