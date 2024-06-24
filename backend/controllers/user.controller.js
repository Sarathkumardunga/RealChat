import User from "../models/user.model.js";

export const getUsersForSidebar = async (req, res) => {
    try {
        //First we try to get the currently authenticated logged in user
        const loggedInUserId = req.user._id //we are able to use this req.user._id as protectRoute ensures this

        //Next fetch all the users from the database
        const filteredUsers = await User.find({
            _id: {$ne: loggedInUserId}
        }).select("-password");

        res.status(200).json(filteredUsers);

    } catch (error) {
        console.error("Error in getUsersForSidebar: ", error.message);
        res.status(500).json({error: "Internal Server error"});
    }
}