import mongoose from "mongoose";


export interface UserDataInput {
    name: string,
    email: string,
    password: string
}

export interface UserInterface extends UserDataInput, mongoose.Document {
    _id: mongoose.ObjectId,
    createdAt: Date,
    updatedAt: Date,
}

const userSchema: mongoose.Schema = new mongoose.Schema({
    email: {type: String, required: true, unique: true},
    name: {type: String, required: true},
    password: {type: String, required: true},
}, {
    timestamps: true
})

export const User = mongoose.model('User', userSchema)