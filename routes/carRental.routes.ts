import { Router, Request, Response } from "express";
import carRentalController from "../controller/carRental.controller";
const carRentalRoutes = Router();

carRentalRoutes.post("/", carRentalController.makeRequest)

export default carRentalRoutes