import {Router} from 'express';
import wishlistService from "./wishlist.Service";
import authService from "../auth/auth.services";

const wishlistRouter: Router = Router();

wishlistRouter.use(authService.protectedRoutes, authService.checkActive);

wishlistRouter.route('/')
    .get(wishlistService.getWishlist)
    .post(wishlistService.addToWishlist);

wishlistRouter.delete('/:productId', wishlistService.removeFromWishlist);

export default wishlistRouter;