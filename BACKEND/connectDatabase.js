import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

// Connect to MongoDB
// Connect to mongodb via mongoose

const connectDB = async () => {
    try {
        const uri = process.env.MONGO_URI;
        await mongoose.connect(uri)

        console.log("MongoDB Connected!")

    } catch (error) {
        console.error("MongoDB Connection Error ❎");
        process.exit(1);
    }
}

  export default connectDB;