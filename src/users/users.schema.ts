import mongoose from "mongoose";
import {users} from "./users.interface";
import bcrypt from 'bcryptjs'

const usersSchema = new mongoose.Schema<users>({
    name: {type: String, required: true},
    username: {type: String, required: true, unique: true},
    email: {type: String, required: true, unique: true},
    image: {type: String, required: false, default: 'user-default.png'},
    active: {type: Boolean, default: true},
    password: {type: String, required: false},
    role: {type: String, enum: ['admin', 'employee', 'user'], default: 'user'},
    googleId: {type: String, required: false},
    hasPassword: {type: Boolean, default: true},
    PasswordResetCode: String,
    PasswordResetCodeExpires: Date,
    PasswordResetCodeVerified: Boolean,
}, {timestamps: true})
const imagesUrl = (document: users) => {
    if (document.image && document.image.startsWith('user')) document.image = `${process.env.BASE_URL}/images/users/${document.image}`
}
usersSchema.post<users>(`init`, imagesUrl).post<users>(`save`, imagesUrl);

usersSchema.pre<users>('save', async function (next) {
    if (!this.isModified('password')) return next();
    this.password = await bcrypt.hash(this.password, 13);
    next();
});

export default mongoose.model<users>('users', usersSchema);