import {Router} from 'express';
import addressService from "./address.Service";
import authService from "../auth/auth.services";

const addressRouter: Router = Router();

addressRouter.use(authService.protectedRoutes, authService.checkActive);

addressRouter.route('/')
    .get(addressService.getaddress)
    .post(addressService.addaddress);

addressRouter.delete('/:productId', addressService.removeaddress);

export default addressRouter;