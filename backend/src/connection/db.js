import mongoose from "mongoose";

const connectDB = async () => {
    try {
        const connect = await mongoose.connect(process.env.CONECTION_STRING);
        console.log("Database connected: " + connect.connection.host, connect.connection.name);
    } catch (error) {
        console.log(error);
        process.exit(1); // Exit process with failure
    }
}

export default connectDB;