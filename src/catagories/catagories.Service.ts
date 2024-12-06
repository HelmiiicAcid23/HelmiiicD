import {catagories} from "./catagories.interface";
import catagoriesSchema from "./catagories.schema";
import refractorService from "../refractor.service";

class CatagoriesService {
    getAll = refractorService.getAll<catagories>(catagoriesSchema);
    createOne = refractorService.createOne<catagories>(catagoriesSchema);
    getOne = refractorService.getOne<catagories>(catagoriesSchema);
    updateOne = refractorService.updateOne<catagories>(catagoriesSchema);
    deleteOne = refractorService.deleteOne<catagories>(catagoriesSchema);
}

const catagoriesService = new CatagoriesService();
export default catagoriesService;