import {Router} from 'express';
import usersService from './users.Service';
import subCatagoriesRoute from "../SubCatagories/SubCatagories.route";
import usersValidation from "./users.validation";

const usersRouter: Router = Router();

usersRouter.use('/:catagoryId/SubCatagories', subCatagoriesRoute)
usersRouter.route('/')
    .get(usersService.getAll)
    .post(usersService.uploadImage, usersService.saveImage, usersValidation.createOne, usersService.createOne);
usersRouter.route('/:id')
    .get(usersValidation.getOne, usersService.getOne)
    .put(usersService.uploadImage, usersService.saveImage, usersValidation.updateOne, usersService.updateOne)
    .delete(usersValidation.deleteOne, usersService.deleteOne);
usersRouter.put('/:id/change-password', usersValidation.changePassword, usersService.changepassword)
export default usersRouter;