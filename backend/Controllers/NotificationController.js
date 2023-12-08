const Notif = require('../Models/NotificationModel')
const mongoose = require('mongoose')

// get all users
const getNotification = async (req, res) => {
    const notif = await Notif.find({}).sort({createdAt: -1})

    res.status(200).json(notif)
}

// get notifications by user_name
const getNotificationsByUser = async (req, res) => {
    const { user_name } = req.query;

    try {
        if (!user_name) {
            return res.status(400).json({ error: 'User name is required in the query parameter' });
        }

        const notif = await Notif.find({ to: user_name }).sort({ createdAt: -1 }).limit(5);

        res.status(200).json(notif);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

// create user
const createNotification = async (req, res) => {
    const {to, from, content, isRead} = req.body
    try{
        const notif = await Notif.create({to, from, content, isRead})
        res.status(200).json(notif)
    }catch(error){
        res.status(400).json({error: error.message})
    }
}

// create user
const updateNotification = async (req, res) => {
    const { id } = req.params
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: 'No notif found'})
    }

    const notif = await Notif.findOneAndUpdate({_id: id}, {
        ...req.body
    })

    if(!notif){
        return res.status(404).json({error: 'No notif found'})
    }
    res.status(200).json(order)
}

module.exports = {
    getNotification,
    getNotificationsByUser,
    updateNotification,
    createNotification,
}