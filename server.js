const express = require("express");
//  create istance

const app = express();

//  require dotenv

app.use(express.json());

require("dotenv").config();

// connect db

const connectDB = require("./config/connectDB");
connectDB();
const PORT = process.env.PORT;
// Middleware to parse JSON data
app.use(express.json());

// Import the routes
const personRoutes = require('./routes/personRoutes');
app.use('/api/person', personRoutes);

// create server
app.listen(PORT, (error) => {
    error
        ? console.error(`fail to connect , ${error}`)
        : console.log(`Server is running at ${PORT}`);
});