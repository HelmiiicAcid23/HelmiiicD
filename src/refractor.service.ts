import {NextFunction, Request, Response} from 'express'
import asyncHandler from "express-async-handler"
import mongoose from "mongoose";

class RefractorService {
    getAll = <modeltype>(model: mongoose.Model<any>) =>
        asyncHandler(async (req: Request, res: Response, next: NextFunction): Promise<void> => {
            let filterData: any = {};
            if (req.filterData) filterData = req.filterData;
            const document: modeltype[] = await model.find(filterData);
            res.status(200).json({data: document});
        });

    createOne = <modeltype>(model: mongoose.Model<any>) =>
        asyncHandler(async (req: Request, res: Response): Promise<void> => {
            const Document: modeltype = await model.create(req.body);
            res.status(201).json({data: Document});
        });
    getOne = <modeltype>(model: mongoose.Model<any>) =>
        asyncHandler(async (req: Request, res: Response): Promise<void> => {
            const Document: modeltype | null = await model.findById(req.params.id);
            res.status(201).json({data: Document});
        });
    updateOne = <modeltype>(model: mongoose.Model<any>) =>
        asyncHandler(async (req: Request, res: Response): Promise<void> => {
            const Document: modeltype | null = await model.findByIdAndUpdate(req.params.id, req.body, {new: true});
            res.status(201).json({data: Document});
        });
    deleteOne = <modeltype>(model: mongoose.Model<any>) =>
        asyncHandler(async (req: Request, res: Response): Promise<void> => {
            const Document: modeltype | null = await model.findByIdAndDelete(req.params.id);
            res.status(204).json();
        });
    // ... other methods...

}

const refractorService = new RefractorService();
export default refractorService;