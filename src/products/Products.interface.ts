import {Document} from 'mongoose'
import {catagories} from "../catagories/catagories.interface"

export interface Products extends Document {
    readonly name: string;
    readonly catagory: catagories;
    readonly subcatagory: catagories;
    readonly price: number;
    readonly priceAfterDiscount: number;
    readonly description: string;
    readonly quantity: number;
    readonly sold: boolean;
    readonly rating: number;
    readonly discount: number;
    images: string[];
    cover: string;
    readonly rateAvg: number;


    image: string;
}