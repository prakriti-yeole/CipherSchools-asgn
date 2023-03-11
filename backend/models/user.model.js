import mongoose from 'mongoose';

export const user_model = new mongoose.Schema({
    email: {
        type: String,
        require: true
    },
    password: String,
    role: String,
    date: {
        type: Date,
    }
})
