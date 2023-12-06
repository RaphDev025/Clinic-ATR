const express = require('express')
const { getNotification, createNotification, updateNotification } = require('../Controllers/NotificationController  ')

const router = express.Router()

router.get('/', getNotification)

router.patch('/:id', updateNotification)

router.post('/', createNotification)

module.exports = router