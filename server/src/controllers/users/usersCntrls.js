const expressAsyncHandler = require("express-async-handler");
const generateToken = require("../../middlewares/generateTokens");
const User = require('../../model/User');
const registerUser = expressAsyncHandler(async (req, res) => {
    const { email, firstname, lastname, password } = req?.body;
    //check if user exists
    const userExists = await User.findOne({ email });
    if (userExists) throw new Error("User already exists");
    try {
        const user = await User.create({ email, firstname, lastname, password })
        res.status(200).json(user);
    } catch (error) {
        res.json(error);
    }
});
// Fetch all users
const fetchUsers = expressAsyncHandler(async (req, res) => {
    try {
        const users = await User.find({});
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});
// login user
const loginUser = expressAsyncHandler(async (req, res) => {
    const { email, password } = req?.body
    //Find the user in db
    const userFound = await User.findOne({ email });
    //Check if user password match
    if (userFound && await userFound?.isPasswordMatch(password)) {
        res.json({
            _id: userFound._id,
            firstname: userFound?.firstname,
            lastname: userFound?.lastname,
            email: userFound?.email,
            isAdmin: userFound?.isAdmin,
            token: generateToken(userFound?._id),

        });
    } else {
        res.status(401);
        throw new Error("Invalid Login Credentials");
    }
});


module.exports = { registerUser, fetchUsers, loginUser };