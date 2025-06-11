    const mongoose = require('mongoose');

    const PostSchema = new mongoose.Schema({
    userId: { type: String, required: true }, // лучше String
    userImage: { type: String, required: true },
    userName: { type: String, required: true },
    body: { type: String, required: true },
    reactions: [
        {
        emoji: { type: String, required: true },
        userId: { type: String, required: true },
        }
    ],
    createdAt: { type: Date, default: Date.now },
    });

    module.exports = mongoose.model('Post', PostSchema);
