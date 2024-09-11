
const mongoose = require("mongoose");
const dbConnect = async () => {
    try {
        await mongoose.connect("mongodb+srv://samulaabhishekreddy:Samula2109@cluster0.xbvc4.mongodb.net/Expense-tracker?retryWrites=true&w=majority",)
        console.log("Database connected successfully");
    } catch (error) {
        console.error("Database connection failed", error);
    }
};
module.exports = dbConnect;