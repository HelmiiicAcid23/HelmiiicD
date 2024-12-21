import {Router} from 'express';
import couponsService from "./Coupons.Service";
import couponsValidation from "./Coupons.validation";
import authService from "../auth/auth.services";

const couponsRouter: Router = Router();

couponsRouter.use(authService.protectedRoutes, authService.checkActive, authService.allowedTo('admin', 'user', 'employee'));

couponsRouter.route('/')
    .get(couponsService.getAll)
    .post(couponsValidation.createOne, couponsService.createOne);

couponsRouter.route('/:id')
    .get(couponsValidation.getOne, couponsService.getOne)
    .put(couponsValidation.updateOne, couponsService.updateOne)
    .delete(couponsValidation.deleteOne, couponsService.deleteOne);

export default couponsRouter;