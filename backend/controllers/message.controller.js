import Conversation from "../models/conversation.model.js";
import Message from "../models/message.model.js";

export const sendMessage = async (req, res) => {
    try {
        const { message } = req.body ;
        //const id = req.params.id;
        const { id: receiverId } = req.params;

        //We need to get the sender id
        const senderId = req.user._id; //But this doesnt until u set it using middleware
        //So, a valid user who logged in should only has the sender id

        //Find the converstion between the two users
        let conversation = await Conversation.findOne({
            //$all is mongodb syntax to get the desired one with all the fields indicated
            participants: { $all: [senderId, receiverId] },
        })
        
        if(!conversation) { //If that is first time no any conversation is there.
            conversation = await Conversation.create({
                participants: [senderId, receiverId],
            })
        }

        //We have created a conversation between the users, Now, we need to create a message
        const newMessage = new Message({
            senderId,
            //above line is same as      senderId: senderId,
            receiverId,
            message
        })

        if(newMessage) {
            conversation.messages.push(newMessage._id);
        }

        //Later the SOCKET.IO functionality goes here

        //Now finally save the conversation and the newMessage
        // await conversation.save();  //We can optimize the saving as these both dont affect each other
        // await newMessage.save();

        //The below command allows to run the above two lines in parallel
        await Promise.all([conversation.save(), newMessage.save()]);

        //After we push the message id into the conversation, we jus return the message
        res.status(201).json({
            newMessage
        })

    } catch (error) {
        console.log("Error in sendMessage controller: ", error.message);
        res.status(500).json({
            error: "Internal Server Error"
        });
    }
};

export const getMessages = async (req, res) => {
    try {
        const { id: userToChatId } = req.params;
        const senderId  = req.user._id; //This we get from the protectRoute middleware

        const conversation = await Conversation.findOne({
            participants: { $all: [senderId, userToChatId] } 
            //But the conversation has only msg id's not the messages.
            //So, inorder to get the messages, mongoDb uses .populate method
        }).populate("messages");    // So instead of returning id's it returns the messages

        if(!conversation) {
            return res.status(200).json([]);
        }

        const messagesOfUser = conversation.messages;
        
        res.status(201).json(messagesOfUser);
        
    } catch (error) {
        console.log("Error in getMessage controller: ", error.message);
        res.status(500).json({
            error: "Internal Server Error"
        });
    }
};