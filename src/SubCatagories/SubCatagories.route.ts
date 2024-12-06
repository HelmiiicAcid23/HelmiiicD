import {Router} from 'express';
import SubCatagoriesService from "./SubCatagories.service";

const SubcatagoriesRouter: Router = Router({mergeParams: true});

SubcatagoriesRouter.route('/')
    .get(SubCatagoriesService.filterSubcategories, SubCatagoriesService.getAll)
    .post(SubCatagoriesService.setCatagoryId, SubCatagoriesService.createOne);
SubcatagoriesRouter.route('/:id')
    .get(SubCatagoriesService.getOne)
    .put(SubCatagoriesService.updateOne)
    .delete(SubCatagoriesService.deleteOne);

export default SubcatagoriesRouter;