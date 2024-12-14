import refractorService from "../refractor.service";
import {Products} from "./Products.interface";
import ProductsSchema from "../SubCatagories/SubCatagories.schema";
import {NextFunction, Request, Response} from "express";
import sharp from "sharp";
import {uploadMultiFiles} from "../middlewares/uploadFiles.middlewares";


class Products_Service {

    getAll = refractorService.getAll<Products>(ProductsSchema, 'products');
    createOne = refractorService.createOne<Products>(ProductsSchema);
    getOne = refractorService.getOne<Products>(ProductsSchema);
    updateOne = refractorService.updateOne<Products>(ProductsSchema);
    deleteOne = refractorService.deleteOne<Products>(ProductsSchema);
    uploadImages = uploadMultiFiles(['image'], [{name: 'cover', maxCount: 1}, {name: 'images', maxCount: 5}]);
    saveImage = async (req: Request, res: Response, next: NextFunction) => {
        if (req.files) {
            if (req.files.cover) {
                const fileName: string = `product-${Date.now()}-cover.webp`;
                await sharp(req.files.cover[0].buffer)
                    .resize(1000, 1000)
                    .webp({quality: 95})
                    .toFile(`uploads/images/products/${fileName}`);
                req.body.cover = fileName;
            }
            if (req.files.images) {
                req.body.images = [];
                await Promise.all(req.files.images.map(async (image: any, index: any) => {
                    const fileName: string = `product-${Date.now()}-product-N${index + 1}.webp`;
                    await sharp(image.buffer)
                        .resize(1000, 1000)
                        .webp({quality: 95})
                        .toFile(`uploads/images/products/${fileName}`);
                    req.body.images.push(fileName);
                }));
            }
            console.log(req.body);
        }
        next();
    }

}

const ProductsService = new Products_Service();
export default ProductsService;