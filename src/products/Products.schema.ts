import mongoose from "mongoose";
import {Products} from "./Products.interface";

const ProductsSchema = new mongoose.Schema<Products>({
    name: {type: String, required: true, trim: true},
    image: String,
    catagory: {type: mongoose.Schema.Types.ObjectId, ref: "catagories"},
    subcatagory: {type: mongoose.Schema.Types.ObjectId, ref: "SubCatagories"},
    price: {type: Number, required: true},
    description: {type: String, required: true},
    quantity: {type: Number, required: true},
    sold: {type: Boolean, default: false},
    rating: {type: Number, default: 0},
    discount: {type: Number, default: 0},
    images: [String],
    rateAvg: {type: Number, default: 0},
    // reviews: [{type: mongoose.Schema.Types.ObjectId, ref: "reviews"}],
    // comments: [{type: mongoose.Schema.Types.ObjectId, ref: "comments"}],

}, {timestamps: true});
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