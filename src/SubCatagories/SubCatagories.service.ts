import {NextFunction, Request, Response} from "express";
import asyncHandler from "express-async-handler";
import SubCatagoriesShema from "./SubCatagories.schema";
import {SubCatagories} from "./SubCatagories.interface";


class SubCatagoriesService {
    getAll = asyncHandler(async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        const subcatagories: SubCatagories[] = await SubCatagoriesShema.find();
        res.status(200).json({data: subcatagories});
    });
    createOne = asyncHandler(async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        const subcatagory: SubCatagories = await SubCatagoriesShema.create(req.body);
        res.status(201).json({data: subcatagory});
    });
    deleteOne = asyncHandler(async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        const subcatagory: SubCatagories | null = await SubCatagoriesShema.findByIdAndDelete(req.params.id);
        res.status(204).json();
    });
    updateOne = asyncHandler(async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        const subcatagory: SubCatagories | null = await SubCatagoriesShema.findByIdAndUpdate(req.params.id, req.body, {new: true});
        res.status(201).json({data: subcatagory});
    });
    getOne = asyncHandler(async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        const subcatagory: SubCatagories | null = await SubCatagoriesShema.findById(req.params.id);
        res.status(201).json({data: subcatagory});
    });
}

const subcatagoriesService = new SubCatagoriesService()
export default new SubCatagoriesService();