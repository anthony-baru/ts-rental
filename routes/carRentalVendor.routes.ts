import { Request, Response, Router } from "express";
import carRentalVendorController from "../controller/carRentalVendor.controller";
const carRentalVendorRoutes = Router()
carRentalVendorRoutes.get("/", (req: Request, res: Response): Response => {
    return res.json({ message: "Hi from car rental routes 👍👍👍👍 " });
});

carRentalVendorRoutes.post("/vehicle", carRentalVendorController.createVehicle)

export default carRentalVendorRoutes
