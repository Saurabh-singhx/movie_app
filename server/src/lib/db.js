import mongoose from "mongoose";

export const ConnectDB = async()=>{

    try {
        const connect = await mongoose.connect(process.env.MONGODB_URI);
        console.log(`mongoDB is Connected ${connect.connection.host}`);

    } catch (error) {
        console.log("mongodb connection error",error);
    }
}