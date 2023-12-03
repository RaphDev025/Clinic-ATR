const mongoose = require('mongoose')
const Schema = mongoose.Schema

const phoneRegex = /^(09|\+639)\d{9}$/;

const UserSchema = new Schema({
    first_name: {
        type: String,
        required: true
    },
    last_name: {
        type: String,
        required: true
    },
    user_name: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    gender: {
        type: String,
        required: true,
        enum: ['Male', 'Female', 'Other']
    },
    user_type: {
        type: String,
        default: 'customer',
        required: true
    },
    address: {
        type: String,
        required: true
    },
    profile: {
        picture: {
            data: Buffer,  
            contentType: String
        }
    },
    phone: {
        type: String,
        validate: {
            validator: function (value) {
                return phoneRegex.test(value);
            },
            message: 'Invalid phone number format'
        }
    },
}, { timestamps: true })

// connected and created a schema model and inserted in the existing collection named user_db
module.exports = mongoose.model('User', UserSchema, 'user_db') 