import {Document, Schema} from "mongoose";
import {users} from "../users/users.interface";
import {Products} from "../products/Products.interface";

export interface carts extends Document {
    items: CartItems[];
    taxPrice: number;
    totalPrice: number;
    totalPriceAfterDiscount: number | undefined;
    user: users;
}

export interface CartItems {
    _id: Schema.Types.ObjectId;
    product: Products;
    quantity: number;
    price: number;
}
