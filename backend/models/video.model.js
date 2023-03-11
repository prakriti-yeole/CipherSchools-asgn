import mongoose from 'mongoose';

export const video_model = new mongoose.Schema({
    title: {
        type: String,
        require: true
    },
    description: {
        type: String,
        require: true
    },
    src: {
        type: String,
        require: true
    },
    views: Number,
    likes: Number,
    comments: Number,
    date: {
        type: Date,
    }
})
