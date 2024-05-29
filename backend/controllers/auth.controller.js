// Logics for each callback controller from auth.routes.js
// To make the file organized in a more clean way

import bcrypt from "bcryptjs";
import User from "../models/user.model.js";
import generateTokenandSetCookie from "../utils/generateToken.js";

export const signup = async (req, res) => {
    try {
        const {fullName, username, password, confirmPassword, gender} = req.body;

        if(password !== confirmPassword) {
            return res.status(400).json({error: "Passwords don't match."});
        }

        const user = await User.findOne({username});

        if(user) {
            return res.status(400).json({error: "Username already exists."});
        }

        //Will create hash password here
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        //Free avatarApi for profile pics
        //https://avatar-placeholder.iran.liara.run/

        const boyProfilePic = `https://avatar.iran.liara.run/public/boy?username=${username}`;
        const girlProfilePic = `https://avatar.iran.liara.run/public/girl?username=${username}`;

        const newUser = new User({
            fullName,
            username,
            password: hashedPassword,
            gender,
            profilePic: gender === "male" ? boyProfilePic : girlProfilePic
        })

        //Now save this new User to the database
        if(newUser) {
            // Generate JWT TOKEN here
            generateTokenandSetCookie(newUser._id, res);

            await newUser.save();

            res.status(201).json({
                _id: newUser._id,
                fullName: newUser.fullName,
                username: newUser.username,
                profilePic: newUser.profilePic
            });
        }else {
            res.send(400).json({error: "Invalid user data"});
        }

    } catch(err){
        console.log("Error in signup Controller", err.message);
        res.status(500).json({
            error : "Internal Server Error"
        })
    }
};

export const login = async (req, res) => {
    try {
        const {username, password} = req.body;
        const user = await User.findOne({username});

        //while comparing, we need to add || "" at last as bcrypt returns password - undefined when the user is not present
        const isPasswordCorrect = await bcrypt.compare(password, user?.password || "");
        //console.log("Password match:", isPasswordCorrect); 

        if(!user || !isPasswordCorrect) {
            return res.status(400).json({error: "Invalid username or password"});
        }

        //if the user is valid, generate token and store in cookie
        generateTokenandSetCookie(user._id, res);

        res.status(200).json({
            _id: user._id,
            fullName: user.fullName,
            username: user.username,
            profilePic: user.profilePic,
        });
    } catch (err) {
        console.log("Error in login controller", err.message);
        res.status(500).json({ error: "Internal server error" });
    }
}

export const logout = (req, res) => {
    console.log("LogoutUser");
}