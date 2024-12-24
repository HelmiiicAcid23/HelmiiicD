import {Router} from 'express';
import ordersService from "./orders.Service";
import authService from "../auth/auth.services";
import ordersValidation from "./orders.validation";

const ordersRouter: Router = Router();

ordersRouter.use(authService.protectedRoutes, authService.checkActive);

ordersRouter.route('/')
    .get(ordersService.filterOrders, ordersService.getAll)
    .post(authService.allowedTo('user'), ordersService.createCashOrder);

ordersRouter.put('/:id/deliver', ordersValidation.payandDeliver, authService.allowedTo('admin', 'employee'), ordersService.deliverOrder);
ordersRouter.put('/:id/pay', ordersValidation.payandDeliver, authService.allowedTo('admin', 'employee'), ordersService.payOrder);

export default ordersRouter;