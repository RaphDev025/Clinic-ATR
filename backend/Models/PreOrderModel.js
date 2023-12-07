const mongoose = require('mongoose')
const { Schema, ObjectId } = mongoose

const PreOrderSchema = new Schema({
    user_name: String,
    user_id: {
        type: ObjectId
    },
    phone: String,
    address: String,
    total_qty: {
        type: Number,
        required: true,
        default: 0     
    },
    total_amount: {
        type: Number,
        required: true,
        default: 0.00
    },
    shipping: {
        type: String,
        default: 'For Pickup'
    }, 
    courier: {
        type: String,
        default: 'For Pickup'
    },
    status: {
        type: String,
        default: 'Pending'
    },
    item_id: {
        type: ObjectId
    },
    item_name: {
        type: String
    },
    unit_price: {
        type: Number
    },
}, { timestamps: true })

module.exports = mongoose.model('PreOrder', PreOrderSchema, 'preorder_db') 