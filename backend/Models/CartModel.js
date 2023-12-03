const mongoose = require('mongoose')
const { Schema, ObjectId } = mongoose;

const CartSchema = new Schema({
    item_id:{
        type: ObjectId,
        unique: false
    },
    item_name: {
        type: String,
        required: true,
        unique: false
    },
    unit_price: {
        type: Number,
        required: true,
        default: 0.00
    },
    qty: {
        type: Number,
        required: true,
        default: 0     
    },
    shipping: {
        type: String,
        default: 'For Pickup'
    }, 
    courier: {
        type: String,
        default: 'For Pickup'
    },
    total_amount: {
        type: Number,
        default: 0
    },
    user_id: {
        type: ObjectId,
        unique: false
    },
    user_name: {
        type: String,
        unique: false
    },
    address: {
        type: String,
        unique: false
    },
    phone: {
        type: String,
        unique: false
    },
}, { timestamps: true })

module.exports = mongoose.model('Cart', CartSchema, 'cart_db') 