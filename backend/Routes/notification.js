const express = require('express')
const { getNotification, createNotification, getNotificationsByUser, updateNotification } = require('../Controllers/NotificationController')

const router = express.Router()

router.get('/', getNotification)

router.get('/user/:user_name', getNotificationsByUser);

router.patch('/:id', updateNotification)

router.post('/', createNotification)

module.exports = router