const express = require('express')
const app = express()
const mongoose = require('mongoose')
const dotenv = require('dotenv')
const cors = require('cors')
const helmet = require('helmet')
const joi = require('joi')

app.use(helmet())
const userRouter = require('./routes/userRoutes')
const noteRouter = require('./routes/noteRoutes')
const port = process.env.PORT || 3000
app.use(express.json())
dotenv.config();
mongoose.connect(process.env.MONGO_URL)
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

