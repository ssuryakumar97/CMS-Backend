const mongoose = require('mongoose');

const postSchema = mongoose.Schema ({
    title: {
        type: String,
        required: true,
        unique: true
    },
    description: {
        type: String,
        required: true
    },
    picture: {
        type: String,
    },
    username: {
        type: String,
        required: true
    },
    categories: {
        type: String,
        required: true
    },
    createDate: {
        type: Date
    }
});

module.exports = mongoose.model('post', postSchema);