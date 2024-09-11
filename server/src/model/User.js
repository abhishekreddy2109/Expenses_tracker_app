const mongoose = require('mongoose');
//Schema
const UserSchema = mongoose.Schema({
    firstname: {
        required: [true, "First name is required"],
        type: String,
    },
    lastname: {
        required: [true, "Last name is required"],
        type: String,
    },
    lastname: {
        required: [true, "Last name is required"],
        type: String,
    },
    email: {
        required: [true, "Email is required"],
        type: String,
    },
    password: {
        required: [true, "Password is required"],
        type: String,
    },
    isAdmin: {
        type: Boolean,
        default: false,
    },
}, {
    timestamp: true,
});
// complie schema in to user
const User = mongoose.model("User", UserSchema);
module.exports = User;