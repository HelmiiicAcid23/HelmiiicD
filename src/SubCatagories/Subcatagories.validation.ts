import {body, param} from "express-validator";
import validatorMiddleware from "../middlewares/validator.middleware";
import catagoriesSchema from "../catagories/catagories.schema";

////////////////////////////////all endpoints have their validation yastaa///////////////////////////////
class subcatagoryValidate {
    createOne =
        [
            body('name').notEmpty().withMessage((valu, {req}) => req.__('validation_field')).isLength({
                min: 2,
                max: 50
            }).withMessage((valu, {req}) => req.__('validation_length_short')),
            body('catagory').notEmpty().withMessage((valu, {req}) => req.__('validation_field'))
                .isMongoId().withMessage((valu, {req}) => req.__('invalid_id'))
                .custom(async (valu: string, {req}) => {
                    const catagory = await catagoriesSchema.findById(valu);
                    if (!catagory) throw new Error(`${req.__('not_found')}`);
                    return true;
                })
            , validatorMiddleware]
    updateOne = [
        param('id').isMongoId().withMessage((valu, {req}) => req.__('invalid_id')),
        body('name').optional().isLength({
            min: 2,
            max: 50
        }).withMessage((valu, {req}) => req.__('validation_length_short')),
        body('catagory').optional()
            .isMongoId().withMessage((valu, {req}) => req.__('invalid_id'))
            .custom(async (valu: string, {req}) => {
                const catagory = await catagoriesSchema.findById(valu);
                if (!catagory) throw new Error(`${req.__('not_found')}`);
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