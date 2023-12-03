const Order = require('../Models/OrderModel')
const mongoose = require('mongoose')
const History = require('../Models/HistoryModel')
const schedule = require('node-schedule')

// Get 
const getOrders = async (req, res) => {
    const orders = await Order.find({}).sort({createdAt: -1})
    res.status(200).json(orders)
}

// API function to count total documents in the User collection
const countOrders = async (req, res) => {
    try {
        const totalOrders = await Order.countDocuments({});
        res.status(200).json({ totalOrders });
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

const newOrders = async (req, res) => {
    try {
        // Get the current date and time
        const currentDate = new Date();
        
        // Set the start of the day
        currentDate.setHours(0, 0, 0, 0);

        // Query to find new orders added on the day
        const newOrdersCount = await Order.countDocuments({
            createdAt: { $gte: currentDate }
        });

        res.status(200).json({ newOrdersCount });
    } catch (error) {
        console.error('Error counting new orders:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

const countPending = async ( req, res ) => {
    try {
        const totalPendingOrders = await Order.countDocuments({ status: 'Pending' });
        res.status(200).json({ totalPendingOrders });
    } catch (error) {
        console.error('Error counting pending orders:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}
const countCompleted = async ( req, res ) => {
    try {
        const totalComplete = await Order.countDocuments({ status: 'Completed' });
        res.status(200).json({ totalComplete });
    } catch (error) {
        console.error('Error counting pending orders:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}
const countInProgress = async ( req, res ) => {
    try {
        const totalInProgress = await Order.countDocuments({ status: 'In-Progress' });
        res.status(200).json({ totalInProgress });
    } catch (error) {
        console.error('Error counting pending orders:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}
// Create 
const createOrder = async (req, res) => {
    const { total_qty, total_amount, shipping, courier, item_list, status, user_name, user_id, address, phone } = req.body
    try{
        const order = await Order.create({ total_qty, total_amount, shipping, courier, item_list, status, user_name, user_id, address, phone })
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

    const order = await Order.findOneAndUpdate({_id: id}, {
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

    const order = await Order.findOneAndDelete({_id: id})

    if(!order){
        return res.status(404).json({error: 'No order found'})
    }
    res.status(200).json(order)
}

// Add this function to transfer daily orders to history
const transferDailyOrders = async () => {
    try {
        const currentDate = new Date();
        currentDate.setHours(0, 0, 0, 0);

        const dailyOrders = await Order.find({ createdAt: { $gte: currentDate } });
        await History.insertMany(dailyOrders);
        await Order.deleteMany({ createdAt: { $gte: currentDate } });

        console.log('Daily orders transferred successfully.');
    } catch (error) {
        console.error('Error transferring daily orders:', error);
    }
};

// Schedule the daily transfer at midnight
schedule.scheduleJob('0 0 * * *', transferDailyOrders);


const totalAmount = async (req, res) => {
    try {
        // Calculate total amount using MongoDB aggregation
        const result = await Order.aggregate([
            {
                $group: {
                    _id: null,
                    totalAmount: { $sum: '$total_amount' }
                }
            }
        ]);

        if (result.length > 0) {
            res.status(200).json({ totalAmount: result[0].totalAmount });
        } else {
            res.status(404).json({ error: 'No orders found' });
        }
    } catch (error) {
        console.error('Error calculating total amount:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

// Add this function to calculate total sales
const totalSales = async (req, res) => {
    try {
        // Calculate total sales using MongoDB aggregation
        const result = await Order.aggregate([
            {
                $group: {
                    _id: null,
                    totalSales: { $sum: '$total_qty' }
                }
            }
        ]);

        if (result.length > 0) {
            res.status(200).json({ totalSales: result[0].totalSales });
        } else {
            res.status(404).json({ error: 'No orders found' });
        }
    } catch (error) {
        console.error('Error calculating total sales:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

module.exports = { getOrders, totalSales, totalAmountRoute: totalAmount, countOrders, newOrders, transferDailyOrders, countCompleted, countInProgress, countPending, deleteOrder, updateOrder, createOrder }