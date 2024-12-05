import {Router} from 'express';
import subCatagoriesService from "./SubCatagories.service";

const SubcatagoriesRouter: Router = Router({mergeParams: true});

SubcatagoriesRouter.route('/')
    .get(subCatagoriesService.filterSubcategories, subCatagoriesService.getAll)
    .post(subCatagoriesService.setCatagoryId, subCatagoriesService.createOne);
SubcatagoriesRouter.route('/:id')
    .get(subCatagoriesService.getOne)
    .put(subCatagoriesService.updateOne)
    .delete(subCatagoriesService.deleteOne);

export default SubcatagoriesRouter;