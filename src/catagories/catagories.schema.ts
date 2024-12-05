import mongoose from "mongoose";
import {catagories} from "./catagories.interface";

const catagoriesSchema = new mongoose.Schema<catagories>({
    name: {type: String, required: true, unique: true},
    image: {type: String, required: false},

}, {timestamps: true})
export default mongoose.model<catagories>('catagories', catagoriesSchema);