import {users} from "./users.interface";
import usersSchema from "./users.schema";
import refractorService from "../refractor.service";

class UsersService {
    getAll = refractorService.getAll<users>(usersSchema);
    createOne = refractorService.createOne<users>(usersSchema);
    getOne = refractorService.getOne<users>(usersSchema);
    updateOne = refractorService.updateOne<users>(usersSchema);
    deleteOne = refractorService.deleteOne<users>(usersSchema);
}

const usersService = new UsersService();
export default usersService;