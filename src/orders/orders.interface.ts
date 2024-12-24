import {Document} from "mongoose";
import {CartItems} from "../cart/cart.interface";
import {Address, users} from "../users/users.interface";

export interface Orders extends Document {
    items: CartItems;
    taxPrice: number;
    paidAt: Date;
    isDelivered: boolean;
    deliveredAt: Date;
    itemsPrice: number;
    payment: 'cash' | 'card'
    user: users;
    totalPrice: number;
    isPaid: boolean;
    address: Address;
}