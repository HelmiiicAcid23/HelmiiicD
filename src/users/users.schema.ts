import mongoose from "mongoose";
import {users} from "./users.interface";

const usersSchema = new mongoose.Schema<users>({
    name: {type: String, required: true},
    username: {type: String, required: true, unique: true},
    email: {type: String, required: true, unique: true},
    image: {type: String, required: false, default: 'user-default image.png'},
    active: {type: Boolean, default: true},
    password: {type: String, required: false},
    role: {type: String, enum: ['admin', 'employee', 'user'], default: 'user'},
    googleId: {type: String, required: false},
    hasPassword: {type: Boolean, default: true},
    PasswordResetCode: String,
    PasswordResetCodeExpires: Date,
    PasswordResetCodeVerified: Boolean,
}, {timestamps: true})
export default mongoose.model<users>('users', usersSchema);