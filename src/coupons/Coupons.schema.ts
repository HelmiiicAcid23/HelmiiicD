import mongoose from "mongoose";
import {coupons} from "./Coupons.interface";

const couponsSchema = new mongoose.Schema<coupons>({
    name: {type: String},
    discount: {type: Number},
    expireTime: {type: Date},
}, {timestamps: true});

export default mongoose.model<coupons>('coupons', couponsSchema);