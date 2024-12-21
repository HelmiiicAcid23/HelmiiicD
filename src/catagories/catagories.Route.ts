import {Router} from 'express';
import catagoriesService from './catagories.Service';
import subCatagoriesRoute from "../SubCatagories/SubCatagories.route";
import catagoryValidation from "./catagories.validation";
import authService from "../auth/auth.services";

const catagoriesRouter: Router = Router();

catagoriesRouter.use('/:catagoryId/SubCatagories', subCatagoriesRoute)
catagoriesRouter.route('/')
    .get(catagoriesService.getAll)
    .post(authService.protectedRoutes, authService.checkActive, authService.allowedTo('admin', 'employee'), catagoryValidation.createOne, catagoriesService.createOne);
catagoriesRouter.route('/:id')
    .get(catagoryValidation.getOne, catagoriesService.getOne)
    .put(authService.protectedRoutes, authService.checkActive, authService.allowedTo('admin', 'employee'), catagoryValidation.updateOne, catagoriesService.updateOne)
    .delete(authService.protectedRoutes, authService.checkActive, authService.allowedTo('admin', 'employee'), catagoryValidation.deleteOne, catagoriesService.deleteOne);

export default catagoriesRouter;