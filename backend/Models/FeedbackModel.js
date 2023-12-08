const mongoose = require('mongoose')
const { Schema, ObjectId } = mongoose

const FeedbackSchema = new Schema({
    first_name: String,
    last_name: String,
    feedback: String,
})

module.exports = mongoose.model('Feedback', FeedbackSchema, 'feedback_db') 