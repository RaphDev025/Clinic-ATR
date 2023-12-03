const Cart = require('../Models/CartModel')
const mongoose = require('mongoose')

// Get all products
const getCart = async (req, res) => {
    const cart = await Cart.find({}).sort({createdAt: -1})
    res.status(200).json(cart)
}

// get single user
const getCartId = async (req, res) => {
    const { id } = req.params
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: 'No Cart Found'})
    }
    const cart = await Cart.findById(id)

    if(!cart){
        return res.status(404).json({error: 'No Cart Found'})
    }
    res.status(200).json(cart)
}

// Create Product
const createCart = async (req, res) => {
    const { item_id, item_name, qty, unit_price, shipping, courier, total_amount, user_name, user_id, phone, address, } = req.body
    try{
        const cart = await Cart.create({ item_id, item_name, qty, unit_price, shipping, courier, total_amount, user_name, user_id, phone, address, })
        res.status(200).json(cart)
    }catch(error){
        res.status(400).json({error: error.message})
    }
}

// Update Product
const updateCart = async (req, res) => {
    const { id } = req.params
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: 'No cart item found'})
    }

    const cart = await Cart.findOneAndUpdate({_id: id}, {
        ...req.body
    })

    if(!cart){
        return res.status(404).json({error: 'No cart item found'})
    }
    res.status(200).json(cart)
}

// Delete Product
const deleteCart = async (req, res) => {
    const { id } = req.params
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: 'No Cart Item found'})
    }

    const cart = await Cart.findOneAndDelete({_id: id})

    if(!cart){
        return res.status(404).json({error: 'No Cart Item found'})
    }
    res.status(200).json(cart)
}

module.exports = { getCart, deleteCart, getCartId, updateCart, createCart }