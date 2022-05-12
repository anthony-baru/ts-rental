import "reflect-metadata";
import express, { Request, Response } from "express";
import connection from "./config/connection";

import carRentalVendorRoutes from "./routes/carRentalVendor.routes";
import carRentalRoutes from "./routes/carRental.routes";

import 'dotenv/config';
require('dotenv').config();

console.log(process.env.DB_DIALECT);
const PORT = parseInt(process.env.PORT!) || 3000;
const app = express();

app.use(express.json());

app.use("/car-rental-vendor", carRentalVendorRoutes);
app.use("/car-rental", carRentalRoutes);

app.get("/", (req: Request, res: Response): Response => {
    return res.json({ message: "Sequelize Example 🤟" });
});

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
// );

const start = async (): Promise<void> => {
    try {
        await connection.sync();

        console.log(connection.models);

        app.listen(PORT, () => {
            console.log(`Server started on port ${PORT}`);
        });
    } catch (error) {
        console.error("LOADING_ERROR", error);
        process.exit(1);
    }
};

void start();