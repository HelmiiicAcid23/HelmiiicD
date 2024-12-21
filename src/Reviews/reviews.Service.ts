import {reviews} from "./reviews.interface";
import {NextFunction, Request, Response} from 'express'
import reviewsSchema from "./reviews.schema";
import refractorService from "../refractor.service";

class ReviewsService {
    setIds(req: Request, res: Response, next: NextFunction) {
        req.body.user = req.user._id;
        req.body.product = req.params.productId;
        next();
    };

    filterReviews(req: Request, res: Response, next: NextFunction) {
        const filterData: any = {};
        if (req.params.productId) filterData.product = req.params.productId;
        if (!req.params.productId && req.user && req.user.role === 'user') filterData.user = req.user._id
        req.filterData = filterData;
        next();
    };

    getAll = refractorService.getAll<reviews>(reviewsSchema);
    createOne = refractorService.createOne<reviews>(reviewsSchema);
    getOne = refractorService.getOne<reviews>(reviewsSchema);
    updateOne = refractorService.updateOne<reviews>(reviewsSchema);
    deleteOne = refractorService.deleteOne<reviews>(reviewsSchema);
}

const reviewsService = new ReviewsService();
export default reviewsService;