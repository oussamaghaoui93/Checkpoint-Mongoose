const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.DB_URI)
        console.log("database connected successfully")
    } catch (error) {
        console.error("Database not connected")
    }
}

module.exports = connectDB