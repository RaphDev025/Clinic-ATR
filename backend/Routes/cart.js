const express = require('express')
const { getCart, deleteCart, getCartId, updateCart, createCart } = require('../Controllers/CartController')

const router = express.Router()

router.get('/', getCart)

router.get('/:id', getCartId)

router.post('/', createCart)

router.delete('/:id', deleteCart)

router.patch('/:id', updateCart)

module.exports = router