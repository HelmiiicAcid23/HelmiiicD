import {Router} from 'express';
import catagoriesService from './catagories.Service';
import subCatagoriesRoute from "../SubCatagories/SubCatagories.route";

const catagoriesRouter: Router = Router();

catagoriesRouter.use('/:catagoryId/SubCatagories', subCatagoriesRoute)
catagoriesRouter.route('/')
    .get(catagoriesService.getAll)
    .post(catagoriesService.createOne);
catagoriesRouter.route('/:id')
    .get(catagoriesService.getOne)
    .put(catagoriesService.updateOne)
    .delete(catagoriesService.deleteOne);

export default catagoriesRouter;