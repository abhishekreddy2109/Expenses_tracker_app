const express = require("express");
const { registerUser, fetchUsers, loginUser } = require("../../controllers/users/usersCntrls");
const userRoute = express.Router();
userRoute.post("/register", registerUser);
userRoute.post("/login", loginUser);
userRoute.get("/", fetchUsers);
module.exports = userRoute;
