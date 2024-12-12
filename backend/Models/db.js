import mongoose from "mongoose";
import dotenv from "dotenv"

dotenv.config()

const connectDB = async() => {
    try{
        await mongoose.connect(process.env.MONGO_URI)
        console.log("Database connected")
    }catch(err){
        console.error("Database Connection :: ERROR ::: " + err)
    }
}

export default connectDB