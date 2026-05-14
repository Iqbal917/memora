import dotenv from "dotenv";
dotenv.config();
import mongoose, {Schema, model} from "mongoose";
import {MONGODB_URI} from "./config.js";

export async function connectDB() {
    try {
        await mongoose.connect(MONGODB_URI);
        console.log("MongoDB Connected!");
    } catch (error) {
        console.log(error);
        process.exit(1);
    }
}
