// Middleware to validate the user before sending the message

import jwt from 'jsonwebtoken';
import User from '../models/user.model.js';

const protectRoute = async (req, res, next) => {
    try {
        //First get the token from the cookies
        const token = req.cookies.jwtToken;
        if(!token) {
            return res.status(401).json({
                error: "Unauthorized - No Token Provided"
            });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
        if(!decoded) {
            res.status(401).json({
                error: "Unauthorized - Invalid Token"
            });
        }
        
        //If all checks passed, we try to find the user with the matched userId
        //Also including the query to not include the password field in the user
        const user = await User.findById(decoded.userId).select("-password");

        if(!user) {
            res.status(404).json({
                error: "User not found"
            })
        }

        //So now if all the cases are handled and there is no ambiguity
        //Set the req.user to the curr user with the valid token(authenticated) inorder to send the message
        req.user = user;

        next(); //next function is the sendMessage route in routes
    }
    catch (error) {
        console.log("Error in protectRoute middleware: ", error.message);
        res.status(500).json({
            error: "Internal Server Error"
        });
    }
}

export default protectRoute;