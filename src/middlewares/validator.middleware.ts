import {validationResult} from "express-validator"
import {NextFunction, Request, RequestHandler, Response} from "express"

const validatorMiddleware: RequestHandler = (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({errors: errors.array()});
    } else {
        next();
    }
}

export default validatorMiddleware;