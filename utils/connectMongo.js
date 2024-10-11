import mongoose from "mongoose";
const connectMongo = async() => mongoose.connect(process.env.Mongo_URI);

export default connectMongo;