import {body, param} from "express-validator";
import validatorMiddleware from "../middlewares/validator.middleware";
import reviewsSchema from "./reviews.schema";

////////////////////////////////all endpoints have their validation yastaa///////////////////////////////
class reviewsValidate {
    createOne = [body('comment')
        .notEmpty().withMessage((valu, {req}) => req.__('validation_field')).isLength({
            min: 2,
            max: 150
        }).withMessage((valu, {req}) => req.__('validation_length_medium'))
        , body('rate').notEmpty().withMessage((valu, {req}) => req.__('validation_field'))
            .isFloat({min: 1, max: 5}).withMessage((valu, {req}) => req.__('validation_value')),
        body('user')
            .notEmpty().withMessage((valu, {req}) => req.__('validation_field'))
            .isMongoId().withMessage((valu, {req}) => req.__('validation_value')),
        body('product')
            .notEmpty().withMessage((valu, {req}) => req.__('validation_field'))
            .isMongoId().withMessage((valu, {req}) => req.__('validation_value'))
            .custom(async (valu: string, {req}) => {
                const review = await reviewsSchema.findOne({user: req.user._id, product: valu});
                if (review) throw new Error(`you already have a review`);
                return true;
            })
        , validatorMiddleware]
    updateOne = [param('id').isMongoId().withMessage((valu, {req}) => req.__('invalid_id'))
        .custom(async (valu, {req}) => {
            const review = await reviewsSchema.findById(valu);
            if (review?.user._id!.toString() !== req.user._id.toString()) throw new Error(`you can't update this review`);
            return true;
        }),
        body('comment').optional().isLength({
            min: 2,
            max: 150
        }).withMessage((valu, {req}) => req.__('validation_length_medium'))
        , body('rate').optional().isFloat({min: 1, max: 5}).withMessage((valu, {req}) => req.__('validation_value'))
        , validatorMiddleware]
    getOne = [
        param('id').isMongoId().withMessage((valu, {req}) => req.__('invalid_id')),
        validatorMiddleware]
    deleteOne = [
        param('id').isMongoId().withMessage((valu, {req}) => req.__('invalid_id'))
            .custom(async (valu, {req}) => {
                if (req.user.role === 'user') {
                    const review = await reviewsSchema.findById(valu);
                    if (review?.user._id!.toString() !== req.user._id.toString()) throw new Error(`you can't delete this review`);
                }
                return true;
            }),
        validatorMiddleware]
}

const reviewsValidation = new reviewsValidate();
export default reviewsValidation;