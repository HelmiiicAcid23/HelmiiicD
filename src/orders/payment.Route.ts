import {Router} from 'express';
import ordersService from "./orders.Service";

const paymentRouter: Router = Router();

paymentRouter.post('/', ordersService.createOnlineOrder);

export default paymentRouter;