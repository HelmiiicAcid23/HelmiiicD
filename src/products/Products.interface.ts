import {Document} from 'mongoose'
import {catagories} from "../catagories/catagories.interface"
import {SubCatagories} from "../SubCatagories/SubCatagories.interface";

export interface Products extends Document {
    readonly name: string;
    readonly catagory: catagories;
    readonly subcatagory: SubCatagories;
    readonly price: number;
    readonly priceAfterDiscount: number;
    readonly description: string;
    readonly quantity: number;
    readonly sold: Number;
    readonly rating: number;
    readonly discount: number;
    images: string[];
    cover: string;
    readonly rateAvg: number;
}