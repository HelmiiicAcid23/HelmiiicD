import {Router} from 'express';
import catagoriesService from './catagories.Service';

const catagoriesRouter: Router = Router();

catagoriesRouter.route('/')
    .get(catagoriesService.getAll)
    .post(catagoriesService.createOne);
catagoriesRouter.route('/:id')
    .get(catagoriesService.getOne)
    .put(catagoriesService.updateOne)
    .delete(catagoriesService.deleteOne);

export default catagoriesRouter;