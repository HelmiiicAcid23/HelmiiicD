"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const catagories_Service_1 = __importDefault(require("./catagories.Service"));
const catagoriesRouter = (0, express_1.Router)();
catagoriesRouter.route('/')
    //.get(catagoriesService.getAll)
    .post(catagories_Service_1.default.createOne);
catagoriesRouter.route('/:id')
    .get(catagories_Service_1.default.getOne)
    .put(catagories_Service_1.default.updateOne)
    .delete(catagories_Service_1.default.deleteOne);
exports.default = catagoriesRouter;
