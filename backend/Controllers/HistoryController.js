const History = require('../Models/HistoryModel')

// Get 
const getHistory = async (req, res) => {
    const orders = await History.find({}).sort({createdAt: -1})
    res.status(200).json(orders)
}

// Create 
const createHistory = async (req, res) => {
    const { total_qty, total_amount, shipping, courier, item_list, status, user_name, user_id, address, phone } = req.body
    try{
        const order = await History.create({ total_qty, total_amount, shipping, courier, item_list, status, user_name, user_id, address, phone })
        res.status(200).json(order)
    }catch(error){
        res.status(400).json({error: error.message})
    }
}

module.exports = { getHistory, createHistory }