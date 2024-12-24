import {body, param} from "express-validator";
import validatorMiddleware from "../middlewares/validator.middleware";

class OrdersValidation {
    createCashOrder = [
        body('address'),


        validatorMiddleware
    ]
    /*.notEmpty().withMessage((val, {req}) => req.__('validation_field'))
    .isLength({min: 2, max: 50}).withMessage((val, {req}) => req.__('validation_length_short'))*/

    payandDeliver = [
        param('id').isMongoId().withMessage((val, {req}) => req.__('invalid_id')),
        validatorMiddleware
    ]
}

const ordersValidation = new OrdersValidation();

export default ordersValidation;