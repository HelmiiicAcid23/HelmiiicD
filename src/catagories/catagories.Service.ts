import {NextFunction, Request, Response} from 'express'
import {catagories} from "./catagories.interface";
import catagoriesSchema from "./catagories.schema";
import asyncHandler from "express-async-handler"

class CatagoriesService {
    getAll = asyncHandler(async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        const catagories: catagories[] = await catagoriesSchema.find();
        res.status(200).json({data: catagories});
    });

    createOne = asyncHandler(async (req: Request, res: Response): Promise<void> => {
        const Catagory: catagories = await catagoriesSchema.create(req.body);
        res.status(201).json({data: Catagory});
    });
    getOne = asyncHandler(async (req: Request, res: Response): Promise<void> => {
        const Catagory: catagories | null = await catagoriesSchema.findById(req.params.id);
        res.status(201).json({data: Catagory});
    });
    updateOne = asyncHandler(async (req: Request, res: Response): Promise<void> => {
        const Catagory: catagories | null = await catagoriesSchema.findByIdAndUpdate(req.params.id, req.body, {new: true});
        res.status(201).json({data: Catagory});
    });
    deleteOne = asyncHandler(async (req: Request, res: Response): Promise<void> => {
        const Catagory: catagories | null = await catagoriesSchema.findByIdAndDelete(req.params.id);
        res.status(204).json();
    });
    // ... other methods...

}

const catagoriesService = new CatagoriesService();
export default catagoriesService;