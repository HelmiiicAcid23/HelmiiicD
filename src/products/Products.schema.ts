import mongoose from "mongoose";
import {Products} from "./Products.interface";

const ProductsSchema = new mongoose.Schema<Products>({
    name: {type: String, required: true, trim: true},
    description: {type: String, required: true, trim: true},
    catagory: {type: mongoose.Schema.Types.ObjectId, ref: "catagories"},
    subcatagory: {type: mongoose.Schema.Types.ObjectId, ref: "SubCatagories"},
    price: {type: Number, required: true},
    discount: {type: Number, default: 0},
    priceAfterDiscount: {type: Number},
    quantity: {type: Number, default: 0},
    rating: {type: Number, default: 0},
    images: [String],
    cover: String,
    rateAvg: {type: Number, default: 0},
    sold: {type: Number, default: 0},
    // reviews: [{type: mongoose.Schema.Types.ObjectId, ref: "reviews"}],
    // comments: [{type: mongoose.Schema.Types.ObjectId, ref: "comments"}],

}, {toJSON: {virtuals: true}, toObject: {virtuals: true}, timestamps: true});

ProductsSchema.virtual('reviews', {localField: '_id', foreignField: 'product', ref: 'reviews'})


const imagesUrl = (document: Products) => {
    if (document.cover) document.cover = `${process.env.BASE_URL}/images/products/${document.cover}`
    if (document.images) document.images = document.images.map(image => `${process.env.BASE_URL}/images/products/${image}`)
    return document;
}
ProductsSchema.post<Products>(`init`, imagesUrl).post<Products>(`save`, imagesUrl);

ProductsSchema.pre<Products>(/^find/, function (next) {
    this.populate({path: 'subcatagory', select: 'name image'});
    next();
})

export default mongoose.model<Products>("Products", ProductsSchema);