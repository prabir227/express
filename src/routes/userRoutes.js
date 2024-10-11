const express = require('express')
const userRouter = express.Router()
const {signUp, signIn} = require('../controllers/userController')

userRouter.post('/login', signIn)

userRouter.post('/register', signUp)

module.exports = userRouter