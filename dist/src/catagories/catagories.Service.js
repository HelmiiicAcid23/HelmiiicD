"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const catagories_schema_1 = __importDefault(require("./catagories.schema"));
const express_async_handler_1 = __importDefault(require("express-async-handler"));
class CatagoriesService {
    constructor() {
        /*getAll = asyncHandler(async (res: Response): Promise<void> => {
            const catagory: catagories[] = await catagoriesSchema.find();
            res.status(200).json({data: catagory});
        });*/
        this.createOne = (0, express_async_handler_1.default)((req, res) => __awaiter(this, void 0, void 0, function* () {
            const Catagory = yield catagories_schema_1.default.create(req.body);
            res.status(201).json({ data: Catagory });
        }));
        this.getOne = (0, express_async_handler_1.default)((req, res) => __awaiter(this, void 0, void 0, function* () {
            const Catagory = yield catagories_schema_1.default.findById(req.params.id);
            res.status(201).json({ data: Catagory });
        }));
        this.updateOne = (0, express_async_handler_1.default)((req, res) => __awaiter(this, void 0, void 0, function* () {
            const Catagory = yield catagories_schema_1.default.findByIdAndUpdate(req.params.id, req.body, { new: true });
            res.status(201).json({ data: Catagory });
        }));
        this.deleteOne = (0, express_async_handler_1.default)((req, res) => __awaiter(this, void 0, void 0, function* () {
            const Catagory = yield catagories_schema_1.default.findByIdAndDelete(req.params.id);
            res.status(204).json();
        }));
        // ... other methods...
    }
}
const catagoriesService = new CatagoriesService();
exports.default = catagoriesService;
