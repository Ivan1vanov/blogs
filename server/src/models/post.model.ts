import mongoose from 'mongoose';


export interface PostInputData {
    text: string,
    author: string,
}

export interface PostInterface extends PostInputData, mongoose.Document {
    _id: mongoose.ObjectId,
    createdAt: Date,
    updatedAt: Date,
}

const postSchema: mongoose.Schema = new mongoose.Schema({
    text: {type: String, required: true},
    author: {type: String, required: true},
    likes: [String],
}, {
    timestamps: true
})

export const Post = mongoose.model('Post', postSchema)

