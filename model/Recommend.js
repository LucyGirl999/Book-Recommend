const mongoose = require('mongoose')
const Schema = require('mongoose').Schema;

const RecommendSchema = new Schema({
    student: {
        type: String,
        require: true
    },
    email: {
        type: String,
    },
    collage: {
        type: String,
        required: true
    },
    author: {
        type: String,
        require: true
    },
    language: {
        type: String,
        required: true
    },
    bookName: {
        type: String,
        require: true
    },
    ISBN: {
        type: String,
        required: true
    },
    house: {
        type: String,
        require: true
    },
    reason: {
        type: String,
        required: true
    },
    data: {
        type: String,
        required:true
    },
    state: {
        type: String,
        required: true
    }
})
module.exports = Recommend = mongoose.model("recommend",RecommendSchema)