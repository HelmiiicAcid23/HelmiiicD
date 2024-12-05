import mongoose from "mongoose";
import {SubCatagories} from "./SubCatagories.interface";

const SubCatagoriesShema = new mongoose.Schema<SubCatagories>({
    name: {type: String, required: true, trim: true},
    image: String,
    category: {type: mongoose.Schema.Types.ObjectId, ref: "catagories"},
}, {timestamps: true});

SubCatagoriesShema.pre<SubCatagories>(/^find/, function (next) {
    this.populate({path: 'category', select: '-_id name'});
    next();
})

export default mongoose.model<SubCatagories>("SubCatagories", SubCatagoriesShema);