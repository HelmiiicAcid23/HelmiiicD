import {NextFunction, Request, Response} from 'express'
import asyncHandler from "express-async-handler"
import mongoose from "mongoose";
import ApiErrors from "./utiles/api.errors";
import Features from "./utiles/features";

class RefractorService {
    getAll = <modeltype>(model: mongoose.Model<any>, modelName?: string) =>
        asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
            let filterData: any = {};
            if (req.filterData) filterData = req.filterData;
            const documentsCount = await model.find(filterData).countDocuments();
            const features = new Features(model.find(filterData), req.query).filter().sort().limitfields().search(modelName!).pagination(documentsCount);
            const {mongooseQuery, paginationResult} = features;
            const document: modeltype[] = await mongooseQuery;
            res.status(200).json({pagination: paginationResult, data: document});
        });

    createOne = <modeltype>(model: mongoose.Model<any>) =>
        asyncHandler(async (req: Request, res: Response): Promise<void> => {
            const Document: modeltype = await model.create(req.body);
            res.status(201).json({data: Document});
        });
    getOne = <modeltype>(model: mongoose.Model<any>) =>
        asyncHandler(async (req: Request, res: Response, next: NextFunction): Promise<void> => {
            const Document: modeltype | null = await model.findById(req.params.id);
            if (!Document) return next(new ApiErrors(`${req.__('not_found')}`, 404));
            res.status(201).json({data: Document});
        });
    updateOne = <modeltype>(model: mongoose.Model<any>) =>
        asyncHandler(async (req: Request, res: Response, next: NextFunction): Promise<void> => {
            const Document: modeltype | null = await model.findByIdAndUpdate(req.params.id, req.body, {new: true});
            if (!Document) return next(new ApiErrors(`${req.__('not_found')}`, 404));
            res.status(201).json({data: Document});
        });
    deleteOne = <modeltype>(model: mongoose.Model<any>) =>
        asyncHandler(async (req: Request, res: Response, next: NextFunction): Promise<void> => {
            const Document: modeltype | null = await model.findByIdAndDelete(req.params.id);
            if (!Document) return next(new ApiErrors(`${req.__('not_found')}`, 404));
            res.status(204).json();
        });

}

const refractorService = new RefractorService();
export default refractorService;