import {Router} from 'express';
import usersService from './users.Service';
import subCatagoriesRoute from "../SubCatagories/SubCatagories.route";
import usersValidation from "./users.validation";

const usersRouter: Router = Router();

usersRouter.use('/:catagoryId/SubCatagories', subCatagoriesRoute)
usersRouter.route('/')
    .get(usersService.getAll)
    .post(usersValidation.createOne, usersService.createOne);
usersRouter.route('/:id')
    .get(usersValidation.getOne, usersService.getOne)
    .put(usersValidation.updateOne, usersService.updateOne)
    .delete(usersValidation.deleteOne, usersService.deleteOne);

export default usersRouter;