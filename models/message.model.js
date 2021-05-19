const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const messageSchema = new Schema({
    content: { 
        type: String,
        minlength: 1,
        trim: true,
        required: true
    },
    sender: {
        type: String, // ID of user who sent the message
        required: true
    }
});

const Message = mongoose.model('Message', messageSchema);
module.exports = Message;