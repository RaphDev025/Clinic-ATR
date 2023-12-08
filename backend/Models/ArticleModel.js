const mongoose = require('mongoose')
const Schema = mongoose.Schema

const ArticleSchema = new Schema({
    title: {
        type: String,
        required: true,
        unique: true
    },
    description: {
        type: String,
        required: true,
    },
    price: {
        type: String,
    },
    category: {
        type: String,
    },
    post_img: String
}, { timestamps: true })

module.exports = mongoose.model('Article', ArticleSchema, 'articles_db') 