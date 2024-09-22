const expressAsyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");
const User = require("../model/User");

const authMiddleware = expressAsyncHandler(async (req, res, next) => {
    let token;

    if (req?.headers?.authorization?.startsWith("Bearer")) {
        token = req?.headers?.authorization?.split(" ")[1];

        try {
            if (token) {
                const decodedUser = jwt.verify(token, process.env.JWT_KEY);
                req.user = decodedUser; // Attach decoded user to the request object for further use
                //find user
                const user = await User.findById(decodedUser?.id);
                console.log(user);
                req.user = user;
                next();
            }
        } catch (error) {
            res.status(401); // Set the response status to Unauthorized
            throw new Error("Not authorized, token failed or expired");
        }
    } else {
        res.status(401); // Set the response status to Unauthorized
        throw new Error("Not authorized, token missing");
    }
});

module.exports = authMiddleware;
