import express from 'express';
import {Server} from "http";
import path from 'path';
import dotenv from 'dotenv';
import i18n from 'i18n';
import dbConnection from "./src/config/database";
import mountRoutes from "./src";
import hpp from "hpp"
import cors from "cors";
import cookieParser from "cookie-parser";


const app: express.Application = express();
app.use(express.json({limit: '10kb'}));
app.use(cors({
    origin: ['http://localhost:4200'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    credentials: true,
}));
app.use(cookieParser());
let server: Server;
dotenv.config();
app.use(express.static('uploads'));
app.use(hpp({whitelist: ['price']}));
i18n.configure({
    locales: ['en', 'ar'],
    directory: path.join(__dirname, 'locales'),
    defaultLocale: 'en',
    queryParameter: 'lang'
});
app.use(i18n.init);
dbConnection();
mountRoutes(app);

server = app.listen(process.env.PORT, () => {
    console.log(`Server started on port ${process.env.PORT}`);
});

process.on('unhandledRejection', (err: Error) => {
    console.error(`unhandledRejection ${err.name} | ${err.message}`);
    server.close(() => {
        console.error('shutting the application down');
        process.exit(1);
    });
});