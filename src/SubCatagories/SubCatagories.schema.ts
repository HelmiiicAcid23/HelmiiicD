import mongoose from "mongoose";
import {SubCatagories} from "./SubCatagories.interface";

const SubCatagoriesSchema = new mongoose.Schema<SubCatagories>({
    name: {type: String, required: true, trim: true},
    image: String,
    catagory: {type: mongoose.Schema.Types.ObjectId, ref: "catagories"},
}, {timestamps: true});

SubCatagoriesSchema.pre<SubCatagories>(/^find/, function (next) {
    this.populate({path: 'catagory', select: '-_id name'});
    next();
})

export default mongoose.model<SubCatagories>("SubCatagories", SubCatagoriesSchema);