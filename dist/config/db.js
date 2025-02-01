import mongoose from 'mongoose';
// import dotenv from 'dotenv';
// dotenv.config();
const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/socialNetworkDB');
        // {
        // });
        console.log('MongoDB connected');
        return mongoose.connection;
    }
    catch (err) {
        console.error('Database connection failed:', err);
        throw new Error("Dabase connection failed.");
    }
};
export default connectDB;
