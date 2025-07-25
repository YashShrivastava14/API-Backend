const mongoose = require('mongoose')

//mongo db cluster url

const connectDB = async ()=>{
    try{
        await mongoose.connect(process.env.MONGO_LIVE_URL)
        console.log("Connected to MongoDB")

    }catch(err){
        console.log(err)
    }
}

module.exports=connectDB