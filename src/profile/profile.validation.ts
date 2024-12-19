import {body, param} from "express-validator";
import validatorMiddleware from "../middlewares/validator.middleware";
import bcrypt from "bcryptjs";

////////////////////////////////all endpoints have their validation yastaa///////////////////////////////
class profileValidate {
    updateOne = [
        body('name').optional().isLength({
            min: 2,
            max: 50
        }).withMessage((valu, {req}) => req.__('validation_length_short')),

        validatorMiddleware]
    getOne = [
        body('name').optional().isLength({
            min: 2,
            max: 50
        }).withMessage((valu, {req}) => req.__('validation_length_short')),
        validatorMiddleware]
    deleteOne = [
        param('id').isMongoId().withMessage(({req}) => req.__('invalid_id')),
        validatorMiddleware]
    changePassword = [
        body('currentPassword')
            .notEmpty().withMessage((val, {req}) => req.__('validation_field'))
            .isLength({min: 6, max: 20}).withMessage((val, {req}) => req.__('validation_length_password'))
            .custom(async (val: string, {req}) => {
                const invalidPassword = await bcrypt.compare(val, req.user.password);
                if (!invalidPassword) throw new Error(`${req.__('invalid_id')}`);
                return true;
            }),
        body('password')
            .notEmpty().withMessage((val, {req}) => req.__('validation_field'))
            .isLength({min: 6, max: 20}).withMessage((val, {req}) => req.__('validation_length_password')),
        body('confirmPassword')
            .notEmpty().withMessage((val, {req}) => req.__('validation_field'))
            .isLength({min: 6, max: 20}).withMessage((val, {req}) => req.__('validation_length_password'))
            .custom((val: string, {req}) => {
                if (val !== req.body.password) throw new Error(`${req.__('validation_password_match')}`);
                return true;
            }), validatorMiddleware]
    createPassword = [
        body('password')
            .notEmpty().withMessage((val, {req}) => req.__('validation_field'))
            .isLength({min: 6, max: 20}).withMessage((val, {req}) => req.__('validation_length_password')),
        body('confirmPassword')
            .notEmpty().withMessage((val, {req}) => req.__('validation_field'))
            .isLength({min: 6, max: 20}).withMessage((val, {req}) => req.__('validation_length_password'))
            .custom((val: string, {req}) => {
                if (val !== req.body.password) throw new Error(`${req.__('validation_password_match')}`);
                return true;
            }),

        validatorMiddleware]
}

const profileValidation = new profileValidate();
export default profileValidation;