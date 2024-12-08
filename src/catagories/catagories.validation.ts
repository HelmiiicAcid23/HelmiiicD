import {body, param} from "express-validator";
import catagoriesSchema from "./catagories.schema";
import validatorMiddleware from "../middlewares/validator.middleware";

////////////////////////////////all endpoints have their validation yastaa///////////////////////////////
class catagoryValidate {
    createOne = [body('name')
        .notEmpty().withMessage((valu, {req}) => req.__('validation_field')).isLength({
            min: 2,
            max: 50
        }).withMessage((valu, {req}) => req.__('validation_length_short'))
        .custom(async (valu: string, {req}) => {
            const catagory = await catagoriesSchema.findOne({name: valu});
            if (catagory) throw new Error(`${req.__('catagory_already_exists')}`);
            return true;
        }), validatorMiddleware]
    updateOne = [
        param('id').isMongoId().withMessage((valu, {req}) => req.__('invalid_id')),
        body('name').optional().isLength({
            min: 2,
            max: 50
        }).withMessage((valu, {req}) => req.__('validation_length_short'))
            .custom(async (valu: string, {req}) => {
                const catagory = await catagoriesSchema.findOne({name: valu});
                if (catagory && catagory._id!.toString() !== req.params?.id.toString()) {
                }
                throw new Error(`${req.__('catagory_already_exists')}`);
            }),
        validatorMiddleware]
    getOne = [
        param('id').isMongoId().withMessage((valu, {req}) => req.__('invalid_id')),
        validatorMiddleware]
    deleteOne = [
        param('id').isMongoId().withMessage(({req}) => req.__('invalid_id')),
        validatorMiddleware]
}

const catagoryValidation = new catagoryValidate();
export default catagoryValidation;