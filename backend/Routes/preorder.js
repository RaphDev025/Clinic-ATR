const express = require('express')
const { getOrders, deleteOrder, getSingleOrder, updateOrder, countPending, createOrder, countOrders } = require('../Controllers/PreOrderController')

const router = express.Router()

router.get('/', getOrders)

router.get('/:id', getSingleOrder)

router.get('/count', countOrders)

router.get('/pending', countPending)

router.post('/', createOrder) 

router.delete('/:id', deleteOrder)

router.patch('/:id', updateOrder)

module.exports = router