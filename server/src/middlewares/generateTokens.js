const jwt = require("jsonwebtoken");
const generateToken = id => {
    console.log("JWT_KEY:", process.env.JWT_KEY); // For debugging
    return jwt.sign({ id }, process.env.JWT_KEY, { expiresIn: "30d" });


}
module.exports = generateToken;