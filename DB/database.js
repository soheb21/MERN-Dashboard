const mongoose = require("mongoose")

const connectDB = async () => {
    try {

        await mongoose.connect(process.env.MONGODB_URL)
        console.log(`Database is connected : ${mongoose.connection.host}`)
    } catch (error) {
        console.log(`Mongoose database is failed to connect: ${error}`)
    }
}
module.exports=connectDB;