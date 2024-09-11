const express = require("express");
const dbConnect = require("./config/dbConnect");
const userRoute = require("./routes/users/usersRoute");
const { errorHandler, notFound } = require("./middlewares/errormiddleware");
const app = express();
app.use(express.json());

dbConnect();
//router
app.use("/", userRoute);
app.use(errorHandler);
app.use(notFound);
module.exports = app;