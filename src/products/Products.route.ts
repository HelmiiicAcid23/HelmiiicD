import {Router} from 'express';
import ProductsService from "./Products.service";
import ProductsValidation from "./Products.validation";
import authService from "../auth/auth.services";

const ProductsRouter: Router = Router();

ProductsRouter.route('/')
    .get(ProductsService.getAll)
    .post(authService.protectedRoutes, authService.checkActive, authService.allowedTo('admin', 'employee'), ProductsService.uploadImages, ProductsService.saveImage, ProductsValidation.createOne, ProductsService.createOne);
ProductsRouter.route('/:id')
    .get(ProductsValidation.getOne, ProductsService.getOne)
    .put(authService.protectedRoutes, authService.checkActive, authService.allowedTo('admin', 'employee'), ProductsService.uploadImages, ProductsService.saveImage, ProductsValidation.updateOne, ProductsService.updateOne)
    .delete(authService.protectedRoutes, authService.checkActive, authService.allowedTo('admin', 'employee'), ProductsValidation.deleteOne, ProductsService.deleteOne);

export default ProductsRouter;