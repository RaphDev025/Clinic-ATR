require('dotenv').config()

const cors = require('cors');
const express = require('express')
const mongoose = require('mongoose')

const users = require('./Routes/users')
const products = require('./Routes/products')
const articles = require('./Routes/articles')
const cart = require('./Routes/cart')
const order = require('./Routes/ordering')
const preorder = require('./Routes/preorder')
const history = require('./Routes/history')
const notification = require('./Routes/notification')
const feedback = require('./Routes/feedback')

// express app
const app = express()
// Enable CORS for all routes
app.use(cors());
// middleware
app.use(express.json({ limit: '10mb' }));

// routes
app.use('/api/users', users)
app.use('/api/products', products)
app.use('/api/articles', articles)
app.use('/api/cart', cart)
app.use('/api/ordering', order)
app.use('/api/pre-order', preorder)
app.use('/api/history', history)
app.use('/api/notification', notification)
app.use('/api/feedback', feedback)

// connect to db
mongoose.connect(process.env.MONGO_URI)
.then(() => {
    // listening
    app.listen(process.env.PORT, () => {
        console.log('connected to db and listening on port', process.env.PORT)
    })
})
.catch((error) => {
    console.log(error)
})

module.exports = app;