import refractorService from "../refractor.service";
import {Products} from "./Products.interface";
import ProductsSchema from "../SubCatagories/SubCatagories.schema";
import {NextFunction, Request, Response} from "express";
import sharp from "sharp";
import {uploadSingleFile} from "../middlewares/uploadFiles.middlewares";


class Products_Service {

    getAll = refractorService.getAll<Products>(ProductsSchema, 'products');
    createOne = refractorService.createOne<Products>(ProductsSchema);
    getOne = refractorService.getOne<Products>(ProductsSchema);
    updateOne = refractorService.updateOne<Products>(ProductsSchema);
    deleteOne = refractorService.deleteOne<Products>(ProductsSchema);
    uploadImages = uploadSingleFile(['image'], 'cover');
    saveImage = async (req: Request, res: Response, next: NextFunction) => {
        if (req.file) {
            const fileName: string = `product-${Date.now()}-cover.webp`;
            await sharp(req.file.buffer)
                .resize(1000, 1000)
                .webp({quality: 95})
                .toFile(`uploads/images/products/${fileName}`);
            req.body.cover = fileName;
        }
        next();
    }

}

const ProductsService = new Products_Service();
export default ProductsService;