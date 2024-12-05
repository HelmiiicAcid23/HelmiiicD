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
}
export default mountRoutes;