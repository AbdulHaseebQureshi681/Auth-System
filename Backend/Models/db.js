import mongoose from "mongoose"
import dotenv from "dotenv"
dotenv.config()

mongoose.connect(process.env.MONGO_CONN).then(() => {
    console.log("Connected to MongoDB")
}).catch((err) => {
    console.log(err)
})


export default mongoose.connection