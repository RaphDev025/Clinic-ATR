const Feedback = require('../Models/FeedbackModel')

// Get 
const getFeedback = async (req, res) => {
    const orders = await Feedback.find({}).sort({createdAt: -1})
    res.status(200).json(orders)
}

// Create 
const createFeedback = async (req, res) => {
    const { first_name, last_name, feedback } = req.body
    try{
        const order = await Feedback.create({ first_name, last_name, feedback })
        res.status(200).json(order)
    }catch(error){
        res.status(400).json({error: error.message})
    }
}

const deleteFeedback = async (req, res) => {
    const orderId = req.params.id; // Assuming the order ID is passed as a parameter in the URL
    
    try {
        const deletedOrder = await Feedback.findByIdAndDelete(orderId);

        if (!deletedOrder) {
            return res.status(404).json({ error: 'Order not found' });
        }

        res.status(200).json({ message: 'Order deleted successfully', deletedOrder });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = { getFeedback, createFeedback, deleteFeedback }