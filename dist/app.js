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
require("reflect-metadata");
const express_1 = __importDefault(require("express"));
const carRentalVendor_routes_1 = __importDefault(require("./routes/carRentalVendor.routes"));
const carRental_routes_1 = __importDefault(require("./routes/carRental.routes"));
require("dotenv/config");
const cognito_service_1 = require("./services/cognito.service");
require('dotenv').config();
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use("/car-rental-vendor", carRentalVendor_routes_1.default);
app.use("/car-rental", carRental_routes_1.default);
app.get("/", (req, res) => {
    return res.json({ message: "Car Rental Home 🤟" });
});
app.get("/users", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    return res.send({ data: yield new cognito_service_1.CognitoService().listUsers() });
}));
// //owners and dogs
// app.get("/owners/dogs", async (req: Request, res: Response): Promise<Response> => {
//     const allOwnersDogs: Owner[] = await Owner.findAll({ include: [Dog] });
//     return res.status(200).json(allOwnersDogs);
// });
// //owners
// app.get("/owners", async (req: Request, res: Response): Promise<Response> => {
//     const allOwners: Owner[] = await Owner.findAll();
//     return res.status(200).json(allOwners);
// });
// app.get("/owners/:id", async (req: Request, res: Response): Promise<Response> => {
//     const { id } = req.params;
//     const owner: Owner | null = await Owner.findByPk(id);
//     return res.status(200).json(owner);
// });
// app.post("/owners", async (req: Request, res: Response): Promise<Response> => {
//     const owner: Owner = await Owner.create({ ...req.body });
//     return res.status(201).json(owner);
// });
// app.put("/owners/:id", async (req: Request, res: Response): Promise<Response> => {
//     const { id } = req.params;
//     await Owner.update({ ...req.body }, { where: { id } });
//     const updatedOwner: Owner | null = await Owner.findByPk(id);
//     return res.status(200).json(updatedOwner);
// });
// app.delete("/owners/:id", async (req: Request, res: Response): Promise<Response> => {
//     const { id } = req.params;
//     const deletedOwner: Owner | null = await Owner.findByPk(id);
//     await Owner.destroy({ where: { id } });
//     return res.status(200).json(deletedOwner);
// }
// );
// //dogs
// app.get("/dogs", async (req: Request, res: Response): Promise<Response> => {
//     const allDogs: Dog[] = await Dog.findAll();
//     return res.status(200).json(allDogs);
// });
// app.get("/dogs/:id", async (req: Request, res: Response): Promise<Response> => {
//     const { id } = req.params;
//     const dog: Dog | null = await Dog.findByPk(id);
//     return res.status(200).json(dog);
// });
// app.post("/dogs", async (req: Request, res: Response): Promise<Response> => {
//     try {
//         console.log(req.body)
//         const dog: Dog = await Dog.create({ ...req.body });
//         return res.status(201).json(dog.hiddenAttributes);
//     } catch (e: any) {
//         return res.send(e.message)
//     }
// });
// app.put("/dogs/:id", async (req: Request, res: Response): Promise<Response> => {
//     const { id } = req.params;
//     await Dog.update({ ...req.body }, { where: { id } });
//     const updatedDog: Dog | null = await Dog.findByPk(id);
//     return res.status(200).json(updatedDog);
// });
// app.delete("/dogs/:id", async (req: Request, res: Response): Promise<Response> => {
//     const { id } = req.params;
//     const deletedDog: Dog | null = await Dog.findByPk(id);
//     await Dog.destroy({ where: { id } });
//     return res.status(200).json(deletedDog);
// }
// )
exports.default = app;
//# sourceMappingURL=app.js.map