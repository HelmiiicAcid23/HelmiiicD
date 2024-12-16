import {Document} from 'mongoose'

export interface users extends Document {
    readonly username: string;
    readonly name: string;
    password: string;
    readonly email: string;
    readonly role: Role;
    image: string;
    readonly active: boolean;
    googleId: string;
    passwordChangedAt: Date | number | undefined;
    PasswordResetCode: string | undefined;
    PasswordResetCodeExpires: Date | number | undefined;
    PasswordResetCodeVerified: boolean | undefined;
    hasPassword: boolean;

}

type Role = 'admin' | 'user' | 'employee'