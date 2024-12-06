import express from 'express'
import catagoriesRouter from "./catagories/catagories.Route";
import SubcatagoriesRouter from "./SubCatagories/SubCatagories.route";

declare module 'express' {
    interface Request {
        filterData?: any;
    }
}

const mountRoutes = (app: express.Application) => {
    app.use('/api/v1/catagories', catagoriesRouter);
    app.use('/api/v1/subcatagories', SubcatagoriesRouter);
    app.all('*', (req: express.Request, res: express.Response, next: express.NextFunction) => {
        const error = new Error('route not found');
        next(error);
    });
    app.use((err: Error, req: express.Request, res: express.Response, next: express.NextFunction) => {
        res.status(400).json({error: err.message});
    });
}

export default mountRoutes;