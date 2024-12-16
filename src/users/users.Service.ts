import {users} from "./users.interface";
import usersSchema from "./users.schema";
import refractorService from "../refractor.service";
import {NextFunction, Request, Response} from "express";
import ApiErrors from "../utiles/api.errors";
import {uploadSingleFile} from "../middlewares/uploadFiles.middlewares";
import sharp from "sharp";
import bcrypt from "bcryptjs";

class UsersService {
    getAll = refractorService.getAll<users>(usersSchema);
    createOne = refractorService.createOne<users>(usersSchema);
    getOne = refractorService.getOne<users>(usersSchema);
    updateOne = async (req: Request, res: Response, next: NextFunction) => {
        const user: users | null = await usersSchema.findById(req.params.id, {
            name: req.body.name,
            image: req.body.image,
            active: req.body.active
        }, {new: true});
        if (!user) return next(new ApiErrors(`${req.__('not_found')}`, 404));
        res.status(200).json({data: user});
    }
    deleteOne = refractorService.deleteOne<users>(usersSchema);

    changepassword = async (req: Request, res: Response, next: NextFunction) => {
        const user: users | null = await usersSchema.findById(req.params.id, {
            password: bcrypt.hash(req.body.password, 12),
            passwordChangedAt: Date.now,
        }, {new: true});
        if (!user) return next(new ApiErrors(`${req.__('not_found')}`, 404));
        res.status(200).json({data: user});
    }
    uploadImage = uploadSingleFile(['image'], 'image');
    saveImage = async (req: Request, res: Response, next: NextFunction) => {
        if (req.file) {
            const fileName: string = `user-${Date.now()}-cover.webp`;
            await sharp(req.file.buffer)
                .resize(1000, 1000)
                .webp({quality: 95})
                .toFile(`uploads/images/users/${fileName}`);
            req.body.image = fileName;
        }
        next();
    }
}

const usersService = new UsersService();
export default usersService;