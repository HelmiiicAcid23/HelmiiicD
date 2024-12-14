import express from 'express'
import catagoriesRouter from "./catagories/catagories.Route";
import usersRouter from "./users/users.Route";
import SubcatagoriesRouter from "./SubCatagories/SubCatagories.route";
import globalErrors from "./middlewares/errors.middlewares";
import ApiErrors from "./utiles/api.errors";
import ProductsRouter from "./products/Products.route";

declare module 'express' {
    interface Request {
        filterData?: any;
        files?: any;
    }
}

const mountRoutes = (app: express.Application) => {
    app.use('/api/v1/catagories', catagoriesRouter);
    app.use('/api/v1/subcatagories', SubcatagoriesRouter);
    app.use('/api/v1/Products', ProductsRouter);
    app.use('/api/v1/users', usersRouter);
    app.all('*', (req: express.Request, res: express.Response, next: express.NextFunction) => {
        next(new ApiErrors(`route ${req.originalUrl} not found`, 400));
    });
    app.use(globalErrors);
}

export default mountRoutes;