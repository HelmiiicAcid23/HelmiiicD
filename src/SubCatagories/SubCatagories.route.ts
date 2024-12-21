import {Router} from 'express';
import SubCatagoriesService from "./SubCatagories.service";
import subcatagoryValidation from "./Subcatagories.validation";
import authService from "../auth/auth.services";

const SubcatagoriesRouter: Router = Router({mergeParams: true});

SubcatagoriesRouter.route('/')
    .get(SubCatagoriesService.filterSubcatagories, SubCatagoriesService.getAll)
    .post(authService.protectedRoutes, authService.checkActive, authService.allowedTo('admin', 'employee'), SubCatagoriesService.setCatagoryId, subcatagoryValidation.createOne, SubCatagoriesService.createOne);
SubcatagoriesRouter.route('/:id')
    .get(subcatagoryValidation.getOne, SubCatagoriesService.getOne)
    .put(authService.protectedRoutes, authService.checkActive, authService.allowedTo('admin', 'employee'), subcatagoryValidation.updateOne, SubCatagoriesService.updateOne)
    .delete(authService.protectedRoutes, authService.checkActive, authService.allowedTo('admin', 'employee'), subcatagoryValidation.deleteOne, SubCatagoriesService.deleteOne);

export default SubcatagoriesRouter;