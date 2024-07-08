const mongoose = require('mongoose');

const commentSchema = mongoose.Schema ({
    name: {
        type: String,
        required: true
    },
    postId: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    comments: {
        type: String,
        required: true
    } 
})

module.exports = mongoose.model('comment', commentSchema);