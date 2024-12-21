import {body, param} from "express-validator";
import validatorMiddleware from "../middlewares/validator.middleware";
import subcatagoriesSchema from "../SubCatagories/SubCatagories.schema";
import catagoriesSchema from "../catagories/catagories.schema";

////////////////////////////////all endpoints have their validation yastaa///////////////////////////////
class ProductsValidate {
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
            body('catagory')
                // .notEmpty().withMessage((valu, {req}) => req.__('validation_field'))
                .isMongoId().withMessage((valu, {req}) => req.__('invalid_id'))
                .custom(async (val: string, {req}) => {
                    const catagory = await catagoriesSchema.findById(val);
                    if (!catagory) throw new Error(`${req.__('validation_value')}`);
                    return true;
                }),
            body('subcatagory')
                .notEmpty().withMessage((valu, {req}) => req.__('validation_field'))
                .isMongoId().withMessage((valu, {req}) => req.__('invalid_id'))
                .custom(async (valu: string, {req}) => {
                    const subcatagory = await subcatagoriesSchema.findById(valu);
                    if (!subcatagory || subcatagory.catagory._id!.toString() !== req.body.catagory.toString()) throw new Error(`${req.__('validation_value')}`);
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
                const catagory = await catagoriesSchema.findById(val);
                if (!catagory) throw new Error(`${req.__('validation_value')}`);
                return true;
            }),
        body('subcatagory').optional()
            .isMongoId().withMessage((valu, {req}) => req.__('invalid_id'))
            .custom(async (valu: string, {req}) => {
                const subcatagory = await subcatagoriesSchema.findById(valu);
                if (!subcatagory || subcatagory.catagory._id!.toString() !== req.body.catagory.toString()) throw new Error(`${req.__('validation_value')}`);
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

const ProductsValidation = new ProductsValidate();
export default ProductsValidation;