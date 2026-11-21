const mongoose = require("mongoose")

const connect = async () => {
    try {
       await mongoose.connect(process.env.MongoUrl)
        console.log("monDB is connected succefully")
        
    } catch (error) {
        console.log(`Error is --->${error.message}`)
    }
}
module.exports= connect;