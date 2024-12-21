import {Router} from 'express';
import reviewsService from './reviews.Service';
import reviewsValidation from "./reviews.validation";
import authService from "../auth/auth.services";

const reviewsRouter: Router = Router({mergeParams: true});

reviewsRouter.get('/my', authService.protectedRoutes, authService.checkActive, authService.allowedTo('user'), reviewsService.filterReviews, reviewsService.getAll);

reviewsRouter.route('/')
    .get(reviewsService.filterReviews, reviewsService.getAll)
    .post(authService.protectedRoutes, authService.checkActive, authService.allowedTo('user'), reviewsService.setIds, reviewsValidation.createOne, reviewsService.createOne);

reviewsRouter.route('/:id')
    .get(reviewsValidation.getOne, reviewsService.getOne)
    .put(authService.protectedRoutes, authService.checkActive, authService.allowedTo('user'), reviewsValidation.updateOne, reviewsService.updateOne)
    .delete(authService.protectedRoutes, authService.checkActive, authService.allowedTo('user', 'employee', 'admin'), reviewsService.setIds, reviewsValidation.deleteOne, reviewsService.deleteOne);

export default reviewsRouter;
reviewsValidation