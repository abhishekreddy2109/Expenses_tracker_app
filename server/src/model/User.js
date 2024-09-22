const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

// Schema
const UserSchema = mongoose.Schema({
    firstname: {
        required: [true, "First name is required"],
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
    }
}, {
    timestamps: true,
});
UserSchema.pre('save', async function (next) {
    const user = this;
    if (!user.isModified('password')) {
        return next();  // If password is not modified, skip hashing
    }

    try {
        const salt = await bcrypt.genSalt(10);  // Generate salt
        user.password = await bcrypt.hash(user.password, salt);  // Hash the password
        next();  // Continue saving
    } catch (error) {
        return next(error);  // Handle error during hashing
    }
});
// Verify password.....
UserSchema.methods.isPasswordMatch = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
};


const User = mongoose.model('User', UserSchema);
module.exports = User;
