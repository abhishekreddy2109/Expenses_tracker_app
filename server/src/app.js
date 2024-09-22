const express = require("express");
require('dotenv').config();
const dbConnect = require("./config/dbConnect");
const userRoute = require("./routes/users/usersRoute");
const { errorHandler, notFound } = require("./middlewares/errorMiddleware");
const incomeRoute = require("./routes/income/incomeRoute");
const expenseRoute = require("./routes/expenses/expenseRoute");
const app = express();
app.use(express.json());

app.get('/', (req, res) => {
    res.send('Welcome to the Home Page!');
});

dbConnect();
//users route
app.use("/api/users", userRoute);
//income routes
app.use("/api/income", incomeRoute);
//expenses route
app.use("/api/expenses", expenseRoute);
app.use(notFound);
app.use(errorHandler);

module.exports = app;