import mongoose from "mongoose";
import {reviews} from "./reviews.interface";
import ProductsSchema from "../products/Products.schema";

const reviewsSchema = new mongoose.Schema<reviews>({
    comment: {type: String, required: true},
    rate: {type: Number, required: true},
    user: {type: mongoose.Schema.Types.ObjectId, ref: 'users'},
    product: {type: mongoose.Schema.Types.ObjectId, ref: 'Products'}
}, {timestamps: true});

reviewsSchema.statics.calcRating = async function (productId) {
    const result = await this.aggregate([
        {$match: {product: productId}},
        {$group: {_id: 'product', avgRating: {$avg: '$rate'}, ratingQuantity: {$sum: 1}}}
    ]);
    if (result.length > 0) {
        await ProductsSchema.findByIdAndUpdate(productId, {
            rateAvg: result[0].avgRating,
            rating: result[0].ratingQuantity
        })
    } else {
        await ProductsSchema.findByIdAndUpdate(productId, {rateAvg: 0, rating: 0})
    }
}
reviewsSchema.post<reviews>('save', async function () {
    await (this.constructor as any).calcRating(this.product)
});
reviewsSchema.post<reviews>('findOneAndUpdate', async function (doc: reviews) {
    await (doc.constructor as any).calcRating(doc.product);
});
reviewsSchema.post<reviews>('findOneAndDelete', async function (doc: reviews) {
    await (doc.constructor as any).calcRating(doc.product);
});


reviewsSchema.pre<reviews>(/^find/, function (next) {
    this.populate({path: 'user', select: 'name image'});
    next();
})

export default mongoose.model<reviews>('reviews', reviewsSchema);