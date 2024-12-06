import {NextFunction, Request, Response} from "express";
import SubCatagoriesSchema from "./SubCatagories.schema";
import {SubCatagories} from "./SubCatagories.interface";
import refractorService from "../refractor.service";


class subcatagories_Service {
    setCatagoryId(req: Request, res: Response, next: NextFunction) {
        if (req.params.catagoryId && !req.body.catagory) req.body.catagory = req.params.catagory
        next();
    };

    filterSubcategories(req: Request, res: Response, next: NextFunction) {
        const filterData: any = {};
        if (req.params.catagoryId) filterData.catagory = req.params.catagoryId;
        req.filterData = filterData;
        next();
    };

    getAll = refractorService.getAll<SubCatagories>(SubCatagoriesSchema);
    createOne = refractorService.createOne<SubCatagories>(SubCatagoriesSchema);
    getOne = refractorService.getOne<SubCatagories>(SubCatagoriesSchema);
    updateOne = refractorService.updateOne<SubCatagories>(SubCatagoriesSchema);
    deleteOne = refractorService.deleteOne<SubCatagories>(SubCatagoriesSchema);
}

const SubCatagoriesService = new subcatagories_Service();
export default SubCatagoriesService;