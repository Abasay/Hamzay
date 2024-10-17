import mongoose from 'mongoose';
import { v2 as cloudinary } from 'cloudinary';


export async function connectDB() {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URL as string,);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error: any) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
}