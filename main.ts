import express from 'express';
import dotenv from 'dotenv';
import dbConnection from "./src/config/database";
import catagoriesRouter from "./src/catagories/catagories.Route";
import SubcatagoriesRouter from "./src/SubCatagories/SubCatagories.route";

const app: express.Application = express();

app.use(express.json({limit: "10kb"}));
dotenv.config()
dbConnection()
app.use('/api/v1/catagories', catagoriesRouter);
app.use('/api/v1/subcatagories', SubcatagoriesRouter);

app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`)
})