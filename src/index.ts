import express from 'express'
import catagoriesRouter from "./catagories/catagories.Route";
import usersRouter from "./users/users.Route";
import SubcatagoriesRouter from "./SubCatagories/SubCatagories.route";
import globalErrors from "./middlewares/errors.middlewares";
import ApiErrors from "./utiles/api.errors";
import ProductsRouter from "./products/Products.route";
import authRouter from "./auth/auth.route";
import profileRouter from "./profile/profile.Route";
import googleRoute from "./google/google.route";
import wishlistRouter from "./wishlist/wishlist.Route";
import addressRouter from "./address/address.Route";

declare module 'express' {
    interface Request {
        filterData?: any;
        files?: any;
        user?: any;
    }
}

const mountRoutes = (app: express.Application) => {
    app.use('/auth/google', googleRoute);
    app.use('/api/v1/catagories', catagoriesRouter);
    app.use('/api/v1/subcatagories', SubcatagoriesRouter);
    app.use('/api/v1/Products', ProductsRouter);
    app.use('/api/v1/users', usersRouter);
    app.use('/api/v1/auth', authRouter);
    app.use('/api/v1/wishlist', wishlistRouter);
    app.use('/api/v1/address', addressRouter);
    app.use('/api/v1/profile', profileRouter);
    app.all('*', (req: express.Request, res: express.Response, next: express.NextFunction) => {
        next(new ApiErrors(`route ${req.originalUrl} not found`, 400));
    });
    app.use(globalErrors);
}

export default mountRoutes;