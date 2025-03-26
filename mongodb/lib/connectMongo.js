const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();

const connectMongo = async () => {
  try {
    ("");
    console.log(process.env.mongourl);
    await mongoose.connect(process.env.mongourl);
  } catch (error) {
    console.error("MongoDB connection error:", error);
  }
};

module.exports = { connectMongo };
