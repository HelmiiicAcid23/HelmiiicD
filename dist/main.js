"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const database_1 = __importDefault(require("./src/config/database"));
const catagories_Route_1 = __importDefault(require("./src/catagories/catagories.Route"));
const app = (0, express_1.default)();
app.use(express_1.default.json({ limit: "10kb" }));
dotenv_1.default.config();
(0, database_1.default)();
app.use('/api/v1/catagories', catagories_Route_1.default);
app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
});
