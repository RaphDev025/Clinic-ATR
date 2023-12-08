const express = require('express')
const { getFeedback, createFeedback, deleteFeedback } = require('../Controllers/FeedbackController')

const router = express.Router()

router.get('/', getFeedback)

router.post('/', createFeedback) 

router.delete('/:id', deleteFeedback)

module.exports = router