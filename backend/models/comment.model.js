import mongoose from 'mongoose';

export const comment_model = new mongoose.Schema({
    body: {
        type: String,
        require: true
    },
    email: {
        type: String,
        require: true
    },
    userId: {
        type: String,
        require: true
    },
    videoId: {
        type: String,
        require: true
    },
    parentId: {
        type: String,
        default: null
    },
    date: {
        type: Date,
    }
})
