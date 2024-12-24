import {body, param} from "express-validator";
import validatorMiddleware from "../middlewares/validator.middleware";

class CartValidation {

    productValidToBeUsed = [
        body('product').isMongoId().withMessage((val, {req}) => req.__('invalid_id')),
        validatorMiddleware
    ]
    UpdateAndRemove = [
        param('itemId').isMongoId().withMessage((val, {req}) => req.__('invalid_id')),
        validatorMiddleware
    ]
}

const cartValidation = new CartValidation();

export default cartValidation;