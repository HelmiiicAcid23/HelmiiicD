import {coupons} from "./Coupons.interface";
import couponsSchema from "./Coupons.schema";
import refractorService from "../refractor.service";

class CouponsService {
    getAll = refractorService.getAll<coupons>(couponsSchema);
    createOne = refractorService.createOne<coupons>(couponsSchema);
    getOne = refractorService.getOne<coupons>(couponsSchema);
    updateOne = refractorService.updateOne<coupons>(couponsSchema);
    deleteOne = refractorService.deleteOne<coupons>(couponsSchema);
}

const couponsService = new CouponsService();
export default couponsService;