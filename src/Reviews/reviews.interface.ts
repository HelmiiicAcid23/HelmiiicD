import {Document} from 'mongoose'
import {users} from "../users/users.interface";
import {Products} from "../products/Products.interface";

export interface reviews extends Document {
    readonly comment: string;
    readonly rate: number;
    readonly user: users;
    readonly product: Products;
}