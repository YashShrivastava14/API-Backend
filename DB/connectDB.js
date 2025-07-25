const mongoose = require('mongoose')
const url = "mongodb://0.0.0.0:27017/AdmissionPortalP"
//mongo db cluster url
const liveURL = 'mongodb+srv://yshrivastava1404:yash14@cluster0.0rn96sv.mongodb.net/?retryWrites=true&w=majority'
const connectDB = async ()=>{
    try{
        await mongoose.connect(process.env.MONGO_URL)
        console.log("Connected to MongoDB")

    }catch(err){
        console.log(err)
    }
}

module.exports=connectDB