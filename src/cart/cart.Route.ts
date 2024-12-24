import {Router} from 'express';
import cartService from "./cart.Service";
import authService from "../auth/auth.services";
import cartValidation from "./cart.validation";

const cartRouter: Router = Router();

cartRouter.use(authService.protectedRoutes, authService.checkActive, authService.allowedTo('user'))

cartRouter.route('/')
    .get(cartService.getCart)
    .post(cartValidation.productValidToBeUsed, cartService.addToCart)
    .delete(cartService.clearCart);

cartRouter.route('/:itemId')
    .put(cartValidation.UpdateAndRemove, cartService.updateQuantity)
    .delete(cartValidation.UpdateAndRemove, cartService.removeFromCart);

cartRouter.put('/apply-coupon', cartService.applyCoupon);

export default cartRouter;