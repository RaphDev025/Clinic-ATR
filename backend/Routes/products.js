const express = require('express')
const { getProducts, deleteProduct, updateProduct, countProducts, getProductId, getTopProducts, createProduct } = require('../Controllers/ProductController')

const router = express.Router()

router.get('/', getProducts)

router.get('/count', countProducts)

router.get('/top-products', getTopProducts)

router.get('/:id', getProductId)

router.post('/', createProduct)

router.delete('/:id', deleteProduct)

router.patch('/:id', updateProduct)

module.exports = router