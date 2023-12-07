const express = require('express')
const { getHistory, createHistory, deleteHistory } = require('../Controllers/HistoryController')

const router = express.Router()

router.get('/', getHistory)

router.post('/', createHistory) 

router.delete('/:id', deleteHistory)

module.exports = router