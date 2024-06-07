import mongoose from 'mongoose';

const messageSchema = new mongoose.Schema({
    senderId: { //We are matching this id with the id from the user
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    receiverId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    message: {
        type: String,
        required: true
    }
    //CreatedAt, updatedAt eg: 15.30
}, {timestamps: true});

const Message = mongoose.model("Message", messageSchema);

export default Message;