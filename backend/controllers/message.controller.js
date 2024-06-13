export const sendMessage = async (req, res) => {
    try {
        const { message } = req.body;
        //const id = req.params.id;
        const { id: receiverId } = req.params;

        //We need to get the sender id
        const senderId = req.user._id; //But this doesnt until u set it using middleware
        //So, a valid user who logged in should only has the sender id

    } catch (error) {
        console.log("Error in sendMessage controller: ", error.message);
        res.status(500).json({
            error: "Internal Server Error"
        });
    }
};