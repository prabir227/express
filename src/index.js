const express = require('express')
const path = require('path')
const app = express()
const mongoose = require('mongoose')

const port = 3000
const userRouter = require('./routes/userRoutes')
const noteRouter = require('./routes/noteRoutes')
app.use(express.json())

mongoose.connect('mongodb+srv://prabir:hWCgcFWLbWJsZcMW@cluster0.onwo9.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0')
.then(()=>{
  app.listen(port, () => {
    console.log(`Example app listening on port http://localhost:${port}/`)
  })
}).catch((err)=>{
    console.log('Error connecting to the database', err)
})
app.use('/user', userRouter)
app.use('/note', noteRouter)

app.use('/',(req, res) =>{
    res.send('Welcome to the homepage')
})

