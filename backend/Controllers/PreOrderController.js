const PreOrder = require('../Models/PreOrderModel')
const mongoose = require('mongoose')

// Get 
const getOrders = async (req, res) => {
    const orders = await PreOrder.find({}).sort({createdAt: -1})
    res.status(200).json(orders)
}

// API function to count total documents in the User collection
const countOrders = async (req, res) => {
    try {
        const totalOrders = await PreOrder.countDocuments({});
        res.status(200).json({ totalOrders });
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

const countPending = async ( req, res ) => {
    try {
        const totalPendingOrders = await PreOrder.countDocuments({ status: 'Pending' });
        res.status(200).json({ totalPendingOrders });
    } catch (error) {
        console.error('Error counting pending orders:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

// Create 
const createOrder = async (req, res) => {
    const { total_qty, total_amount, shipping, courier, item_list, status, user_name, user_id, address, phone } = req.body
    try{
        const order = await PreOrder.create({ total_qty, total_amount, shipping, courier, item_list, status, user_name, user_id, address, phone })
        res.status(200).json(order)
    }catch(error){
        res.status(400).json({error: error.message})
    }
}

// Update 
const updateOrder = async (req, res) => {
    const { id } = req.params
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: 'No order found'})
    }

    const order = await PreOrder.findOneAndUpdate({_id: id}, {
        ...req.body
    })

    if(!order){
        return res.status(404).json({error: 'No order found'})
    }
    res.status(200).json(order)
}

// Delete 
const deleteOrder = async (req, res) => {
    const { id } = req.params
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: 'No order found'})
    }

    const order = await PreOrder.findOneAndDelete({_id: id})

    if(!order){
        return res.status(404).json({error: 'No order found'})
    }
    res.status(200).json(order)
}

module.exports = { getOrders, countOrders, countPending, deleteOrder, updateOrder, createOrder }