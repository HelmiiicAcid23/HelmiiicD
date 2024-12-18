import {Document} from 'mongoose'
import {catagories} from "../catagories/catagories.interface"

export interface SubCatagories extends Document {
    readonly name: string;
    readonly category: catagories;
    image: string;
}