const mongoose = require('mongoose')
const Schema = mongoose.Schema

const NotificationScheme = new Schema({
    to: {
        type: String,
        required: true,
    },
    from: {
        type: String,
        required: true,
    },
    content:{
        type: String,
        required: true, 
    },
    isRead: {
        type: Boolean,
        default: false
    }
}, { timestamps: true })

// connected and created a schema model and inserted in the existing collection named user_db
module.exports = mongoose.model('Notification', NotificationScheme, 'notification_db') 