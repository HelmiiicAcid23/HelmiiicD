import {body, param} from "express-validator";
import validatorMiddleware from "../middlewares/validator.middleware";

////////////////////////////////all endpoints have their validation yastaa///////////////////////////////
class subcatagoryValidate {
    createOne =
        [
            body('name').notEmpty().withMessage((valu, {req}) => req.__('validation_field')).isLength({
                min: 2,
                max: 50
            }).withMessage((valu, {req}) => req.__('validation_length_short')),
            body('description').notEmpty().withMessage((valu, {req}) => req.__('validation_field')).isLength({
                min: 10,
                max: 500
            }).withMessage((valu, {req}) => req.__('validation_length_long')),
            body('price').notEmpty().withMessage((valu, {req}) => req.__('validation_field'))
                .isFloat({min: 1, max: 100000000}).withMessage((valu, {req}) => req.__('validation_value')),
            body('quantity').optional()
                .isInt({min: 1, max: 10000000}).withMessage((valu, {req}) => req.__('validation_value')),
            body('discount').optional()
                .isFloat({min: 1, max: 100}).withMessage((valu, {req}) => req.__('validation_value'))
                .custom((valu, {req}) => {
                    req.body.priceAfterDiscount = req.body.price - (req.body.price * valu / 100)
                    return true;
                }),
            body('category')
                .notEmpty().withMessage((valu, {req}) => req.__('validation_field'))
                .isMongoId().withMessage((valu, {req}) => req.__('invalid_id'))
                .custom(async (val: string, {req}) => {
                    const category = await categoriesSchema.findById(val);
                    if (!category) throw new Error(`${req.__('validation_value')}`);
                    return true;
                }),
            body('subcategory')
                .notEmpty().withMessage((valu, {req}) => req.__('validation_field'))
                .isMongoId().withMessage((valu, {req}) => req.__('invalid_id'))
                .custom(async (val: string, {req}) => {
                    const subcategory = await subcategoriesSchema.findById(valu);
                    if (!subcategory || subcategory.category._id!.toString() !== req.body.category.toString()) throw new Error(`${req.__('validation_value')}`);
                    return true;
                })
            , validatorMiddleware]
    updateOne = [
        param('id').isMongoId().withMessage((valu, {req}) => req.__('invalid_id')),
        body('name').optional().isLength({
            min: 2,
            max: 50
        }).withMessage((valu, {req}) => req.__('validation_length_short')),
        body('description').optional()
            .isLength({min: 10, max: 500}).withMessage((valu, {req}) => req.__('validation_length_long')),
        body('price').optional()
            .isFloat({min: 1, max: 100000000}).withMessage((valu, {req}) => req.__('validation_value')),
        body('quantity').optional()
            .isInt({min: 1, max: 10000000}).withMessage((valu, {req}) => req.__('validation_value')),
        body('discount').optional()
            .isFloat({min: 1, max: 100}).withMessage((valu, {req}) => req.__('validation_value'))
            .custom((valu, {req}) => {
                req.body.priceAfterDiscount = req.body.price - (req.body.price * valu / 100)
                return true;
            }),
        body('category').optional()
            .isMongoId().withMessage((valu, {req}) => req.__('invalid_id'))
            .custom(async (val: string, {req}) => {
                const category = await categoriesSchema.findById(val);
                if (!category) throw new Error(`${req.__('validation_value')}`);
                return true;
            }),
        body('subcategory').optional()
            .isMongoId().withMessage((valu, {req}) => req.__('invalid_id'))
            .custom(async (val: string, {req}) => {
                const subcategory = await subcategoriesSchema.findById(valu);
                if (!subcategory || subcategory.category._id!.toString() !== req.body.category.toString()) throw new Error(`${req.__('validation_value')}`);
                return true;
            })
        , validatorMiddleware]
    getOne = [
        param('id').isMongoId().withMessage((valu, {req}) => req.__('invalid_id')),
        validatorMiddleware]
    deleteOne = [
        param('id').isMongoId().withMessage((valu, {req}) => req.__('invalid_id')),
        validatorMiddleware]
}

const subcatagoryValidation = new subcatagoryValidate();
export default subcatagoryValidation;