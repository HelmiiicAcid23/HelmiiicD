import {Router} from 'express';
import SubCatagoriesService from "./SubCatagories.service";
import subcatagoryValidation from "./Subcatagories.validation";

const SubcatagoriesRouter: Router = Router({mergeParams: true});

SubcatagoriesRouter.route('/')
    .get(SubCatagoriesService.filterSubcategories, SubCatagoriesService.getAll)
    .post(SubCatagoriesService.setCatagoryId, subcatagoryValidation.createOne, SubCatagoriesService.createOne);
SubcatagoriesRouter.route('/:id')
    .get(subcatagoryValidation.getOne, SubCatagoriesService.getOne)
    .put(subcatagoryValidation.updateOne, SubCatagoriesService.updateOne)
    .delete(subcatagoryValidation.deleteOne, SubCatagoriesService.deleteOne);

export default SubcatagoriesRouter;