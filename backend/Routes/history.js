const express = require('express')
const { getHistory, createHistory } = require('../Controllers/HistoryController')

const router = express.Router()

router.get('/', getHistory)

router.post('/', createHistory) 

module.exports = router