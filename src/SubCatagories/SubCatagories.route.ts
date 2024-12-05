import {Router} from 'express';
import subCatagoriesService from "./SubCatagories.service";

const SubcatagoriesRouter: Router = Router();

SubcatagoriesRouter.route('/')
    .get(subCatagoriesService.getAll)
    .post(subCatagoriesService.createOne);
SubcatagoriesRouter.route('/:id')
    .get(subCatagoriesService.getOne)
    .put(subCatagoriesService.updateOne)
    .delete(subCatagoriesService.deleteOne);

export default SubcatagoriesRouter;