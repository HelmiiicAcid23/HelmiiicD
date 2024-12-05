import {NextFunction, Request, Response} from "express";
import asyncHandler from "express-async-handler";
import SubCatagoriesShema from "./SubCatagories.schema";
import {SubCatagories} from "./SubCatagories.interface";


class SubCatagoriesService {
    setCatagoryId(req: Request, res: Response, next: NextFunction) {
        if (req.params.catagoryId && !req.body.catagory) req.body.catagory = req.params.catagory
        next();
    }

    filterSubcategories(req: Request, res: Response, next: NextFunction) {
        const filterData: any = {};
        if (req.params.catagoryId) filterData.catagory = req.params.catagoryId;
        req.filterData = filterData;
        next();
    }

    getAll = asyncHandler(async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        let filterData: any = {};
        if (req.filterData) filterData = req.filterData;
        const subcatagories: SubCatagories[] = await SubCatagoriesShema.find(filterData);
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