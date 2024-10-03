const mongoose = require("mongoose");

const dotenv = require("dotenv");
dotenv.config(); 

console.log(process.env.DB_URL);

const connectDb = async () => {
    try {
        await mongoose.connect(process.env.DB_URL);
        console.log("MongoDB connected");
        
    } catch (error) {
        console.log("error", error);
    }
};

module.exports = connectDb;