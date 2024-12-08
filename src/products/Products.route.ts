import {Router} from 'express';
import ProductsService from "./Products.service";
import ProductsValidation from "./Products.validation";

const ProductsRouter: Router = Router();

ProductsRouter.route('/')
    .get(ProductsService.getAll)
    .post(ProductsValidation.createOne, ProductsService.createOne);
ProductsRouter.route('/:id')
    .get(ProductsValidation.getOne, ProductsService.getOne)
    .put(ProductsValidation.updateOne, ProductsService.updateOne)
    .delete(ProductsValidation.deleteOne, ProductsService.deleteOne);

export default ProductsRouter;