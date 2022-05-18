import { Router } from "express";
import carRentalVendorController from "../controller/carRentalVendor.controller";
const carRentalVendorRoutes = Router();
carRentalVendorRoutes.get("/", carRentalVendorController.getVendors);

carRentalVendorRoutes.get("/:vendorId", carRentalVendorController.getVendor);

carRentalVendorRoutes.post("/vehicles", carRentalVendorController.createVehicle);

carRentalVendorRoutes.get("/vehicles/:registrationNumber/:vendorId", carRentalVendorController.getVehicle);

carRentalVendorRoutes.get("/vehicles", carRentalVendorController.getAllVehicles);

carRentalVendorRoutes.post("/regions", carRentalVendorController.updateUserRegion);

export default carRentalVendorRoutes;
