import {Document} from 'mongoose'

export interface catagories extends Document {
    readonly name: string;
    image: string;
}