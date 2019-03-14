// 引入mongoose模块
const mongoose = require("mongoose")
// 创建一个mongooseSchema
const Schema = mongoose.Schema;

// create userSchema
const UserSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    tel: {
        type: Number,
        required: true
    },
    identity: {
        type: String,
        required: true
    },
    avatar: {
        type: String
    }
})
// 将UserSchema暴露出去
module.exports = Users = mongoose.model("users",UserSchema)