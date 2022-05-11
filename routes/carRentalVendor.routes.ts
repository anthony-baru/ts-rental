import { Router } from "express";
import carRentalVendorController from "../controller/carRentalVendor.controller";
const carRentalVendorRoutes = Router();
carRentalVendorRoutes.get("/", carRentalVendorController.getVendors);

carRentalVendorRoutes.get("/:userName", carRentalVendorController.getVendor);

carRentalVendorRoutes.post("/vehicles", carRentalVendorController.createVehicle);

export default carRentalVendorRoutes;
