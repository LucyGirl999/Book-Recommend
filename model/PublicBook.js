const mongoose = require('mongoose')
const Schema = require('mongoose').Schema;
//
// bookName: 书名
// bookType：图书分类
// ISBN: ISBN
// house: 出版社
// collection：馆藏号
// type：分类号
// author：作者
// pageNumber：页数
// content：内容简介
// language：语种
const PublicBookSchema = new Schema({
    bookName: {
        type: String,
        required: true
    },
    bookType: {
        type: String,
        required: true
    },
    ISBN: {
        type: String,
        required: true
    },
    house: {
        type: String,
        required: true
    },
    collect: {
        type: String,
        required: true
    },
    type: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true
    },
    pageNumber: {
        type: String
    },
    content: {
        type: String,
        required: true
    },
    language: {
        type: String
    },
    img: {
        type: String,
    },
    remarks: {
        type: String,
    },
    date: {
        type: String,
        required: true
    }
})

module.exports = PublicBook = mongoose.model("publicBook",PublicBookSchema);