import refractorService from "../refractor.service";
import {Products} from "./Products.interface";
import ProductsSchema from "../SubCatagories/SubCatagories.schema";


class Products_Service {

    getAll = refractorService.getAll<Products>(ProductsSchema);
    createOne = refractorService.createOne<Products>(ProductsSchema);
    getOne = refractorService.getOne<Products>(ProductsSchema);
    updateOne = refractorService.updateOne<Products>(ProductsSchema);
    deleteOne = refractorService.deleteOne<Products>(ProductsSchema);
}

const ProductsService = new Products_Service();
export default ProductsService;