// In this file, I  will generate a token and set it in the cookie
import jwt from 'jsonwebtoken';

const generateTokenandSetCookie = (userId, res) => {
    //userId is kinda PAYLOAD to verify the token
    //And the JWT_SECRET_KEY is used to create a digital signature
    const token = jwt.sign({ userId }, process.env.JWT_SECRET_KEY, {
        expiresIn: '15d'
    });

    //Now afetr creating a token, we store it in cookie
    res.cookie("jwtToken", token, {
        maxAge: 15 * 24 * 60 * 60 * 1000,   // in milliseconds
        httpOnly: true,  //Prevent XSS attacks cross-site scripting attacks
        sameSite: "strict",  //Prevent CSRF attacks criss-site request forgery attacks
        secure: process.env.NODE_ENV !== "development"
    })
}

export default generateTokenandSetCookie;