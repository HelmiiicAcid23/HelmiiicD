import mongoose from "mongoose";
import {carts} from "./cart.interface";

const cartSchema = new mongoose.Schema<carts>({
    items: [{
        product: {type: mongoose.Schema.Types.ObjectId, ref: 'Products'},
        quantity: {type: Number, default: 1},
        price: Number
    }],
    taxPrice: Number,
    totalPrice: {type: Number},
    totalPriceAfterDiscount: {type: Number},
    user: {type: mongoose.Schema.Types.ObjectId, ref: 'users'}
}, {timestamps: true});

cartSchema.pre<carts>(/^find/, function (next) {
    this.populate({path: 'items.product', select: 'name cover'})
    next();
});

export default mongoose.model<carts>('carts', cartSchema);