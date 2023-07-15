const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const connectDB = require('./config/dbConn')
require('dotenv').config();

//connection to db
connectDB()

const app = express()
const PORT = process.env.PORT || 5000

app.use(express.urlencoded({extended:false}))
app.use(express.json())
app.use(cors())

app.use('/', require('./routes/api/todoRoutes'))

mongoose.connection.once('open', ()=>{
    console.log('connected to mongoDB');
    app.listen(PORT, ()=> console.log(`server running on ${PORT}`))
})