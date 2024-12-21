import {Document} from "mongoose";

export interface coupons extends Document {
    readonly name: string;
    readonly discount: number;
    readonly expireTime: Date;
}