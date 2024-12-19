import {Router} from 'express';
import profileService from './profile.Service';
import profileValidation from "./profile.validation";
import authService from "../auth/auth.services";

const profileRouter: Router = Router();

profileRouter.use(authService.protectedRoutes, authService.checkActive)
profileRouter.route('/')
    .get(profileService.setUserId, profileService.getOne)
    .put(profileService.uploadImage, profileService.saveImage, profileValidation.updateOne, profileService.updateOne)
    .delete(authService.allowedTo("user"), profileValidation.deleteOne, profileService.deleteOne);
profileRouter.put('/:id/create-password', profileValidation.createPassword, profileService.createPassword)
profileRouter.put('/:id/change-password', profileValidation.changePassword, profileService.changePassword)

export default profileRouter;