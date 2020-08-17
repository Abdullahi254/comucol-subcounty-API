const express = require('express')
const app = express();
const mongoose = require('mongoose')

//importing labs route
const labs = require('./routes/labStats')

//connecting to db
mongoose.connect('mongodb+srv://team-buktu:3FN2P87d7PAlUWYC@cluster0.0kmux.mongodb.net/labs?retryWrites=true&w=majority',{
    useNewUrlParser:true,
    useUnifiedTopology:true
},()=>{
    console.log('connected to db!')
})

//middleware
app.use(express.json())

//route middlewares
app.use('/api/labstats',labs)


app.listen('4000',()=>console.log('SERVER UP ON PORT 4000'))