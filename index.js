const express = require("express")
const dotenv = require("dotenv")
const mongoose = require("mongoose")
const cors = require("cors")
const app = express()
app.use(cors())
app.use(express.json())
dotenv.config()
const PORT  = process.env.PORT || 5000


app.listen(PORT, ()=>{
    console.log(`server is started at port ${PORT}`)
})

mongoose.connect(process.env.MONGO_URL)
.then(()=> {
    console.log("successfully connected to MongoDB")
})
.catch(error =>console.log(error))