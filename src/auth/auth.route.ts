import {Router} from 'express';
import authService from "./auth.services";
import authValidation from "./auth.valid";

const authRouter: Router = Router();

authRouter.post('/signup', authValidation.signup, authService.signup);
authRouter.post('/login', authValidation.login, authService.login);
authRouter.post('/admin-login', authValidation.login, authService.adminLogin);
authRouter.post('/verify-code', authService.verifyedPassword);
authRouter.post('/forgetPassword', authValidation.forgetPassword, authService.forgetPassword);
authRouter.post('/reset-password', authValidation.changePassword, authService.resetPassword);

export default authRouter;