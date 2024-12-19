import usersSchema from "../users/users.schema";
import {NextFunction, Request, Response} from "express";
import ApiErrors from "../utiles/api.errors";
import asyncHandler from "express-async-handler";
import {users} from "../users/users.interface";

class AddressService {
    getaddress = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
        const user: users | null = await usersSchema.findById(req.user._id);
        if (!user) return next(new ApiErrors(`${req.__('not_found')}`, 404));
        res.status(200).json({length: user.address.length, data: user.address});
    });
    addaddress = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
        const user: users | null = await usersSchema.findByIdAndUpdate(req.user._id, {$addToSet: {address: req.body.address}}, {new: true});
        if (!user) return next(new ApiErrors(`${req.__('not_found')}`, 404));
        res.status(200).json({length: user.address.length, data: user.address});
    });
    removeaddress = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
        const user: users | null = await usersSchema.findByIdAndUpdate(req.user._id, {$pull: {address: {_id: req.params.addressId}}}, {new: true});
        if (!user) return next(new ApiErrors(`${req.__('not_found')}`, 404));
        res.status(200).json({length: user.address.length, data: user.address});
    });
}

const addressService = new AddressService();
export default addressService;