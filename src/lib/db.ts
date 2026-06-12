import mongoose from "mongoose"
export const connectToDatabase = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI!)
        console.log("database connected")

    } catch (error) {
        console.error("Error in connect to db", error)
    }
}