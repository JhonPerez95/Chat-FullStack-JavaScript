const mongoose = require('mongoose');

const {Schema} = mongoose;

const ChatSchema = new Schema({
    userName: String,
    msg: String,
    created_at: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('chat', ChatSchema);