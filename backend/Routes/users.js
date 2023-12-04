const express = require('express')
const { createUser, getUserById, updateUserPassword, getUsers, deleteUser, countNewUsersInCurrentMonth, countUsers, updateUser } = require('../Controllers/UserController')

const router = express.Router()

router.get('/', getUsers)

router.get('/count', countUsers)

router.get('/new-count', countNewUsersInCurrentMonth)

router.get('/:id', getUserById)

router.post('/', createUser)

router.delete('/:id', deleteUser)

router.patch('/:id', updateUser)

router.patch('/update-password/:user_name', updateUserPassword)

module.exports = router