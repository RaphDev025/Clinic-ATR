const express = require('express')
const { getOrders, deleteOrder, updateOrder, countPending, createOrder, countOrders } = require('../Controllers/PreOrderController')

const router = express.Router()

router.get('/', getOrders)

router.get('/count', countOrders)

router.get('/pending', countPending)

router.post('/', createOrder) 

router.delete('/:id', deleteOrder)

router.patch('/:id', updateOrder)

module.exports = router