import {Router} from 'express';
import catagoriesService from './catagories.Service';
import subCatagoriesRoute from "../SubCatagories/SubCatagories.route";
import catagoryValidation from "./catagories.validation";

const catagoriesRouter: Router = Router();

catagoriesRouter.use('/:catagoryId/SubCatagories', subCatagoriesRoute)
catagoriesRouter.route('/')
    .get(catagoriesService.getAll)
    .post(catagoryValidation.createOne, catagoriesService.createOne);
catagoriesRouter.route('/:id')
    .get(catagoryValidation.getOne, catagoriesService.getOne)
    .put(catagoryValidation.updateOne, catagoriesService.updateOne)
    .delete(catagoryValidation.deleteOne, catagoriesService.deleteOne);

export default catagoriesRouter;