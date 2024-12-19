import {Document, Schema} from 'mongoose'

export interface users extends Document {
    readonly username: string;
    readonly name: string;
    password: string;
    readonly email: string;
    readonly role: Role;
    image: string | undefined;
    wishlist: Schema.Types.ObjectId[];
    address: Address[];
    readonly active: boolean;
    googleId: string;
    passwordChangedAt: Date | number | undefined;
    PasswordResetCode: string | undefined;
    PasswordResetCodeExpires: Date | number | undefined;
    PasswordResetCodeVerified: boolean | undefined;
    hasPassword: boolean;

}

type Address = {
    street: string;
    city: string;
    state: string;
    zip: string;
};

type Role = 'admin' | 'user' | 'employee'