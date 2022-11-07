import "reflect-metadata";
require('dotenv').config();
import express, { Request, Response } from "express";

import carRentalVendorRoutes from "./routes/carRentalVendor.routes";
import carRentalRoutes from "./routes/carRental.routes";

import 'dotenv/config';
import { CognitoService } from "./services/cognito.service";




const app = express();

app.use(express.json());

app.use("/api/car-rental/vendors", carRentalVendorRoutes);
app.use("/api/car-rental/requests", carRentalRoutes);

app.get("/", (req: Request, res: Response): Response => {
    return res.json({ message: "Car Rental Home 🤟" });
});

app.get("/users/:userName", async (req: Request, res: Response) => {
    return res.send({ data: await new CognitoService().getUser(req.params.userName) });
});

app.get("/users", async (req: Request, res: Response): Promise<Response> => {

    return res.send({ data: await new CognitoService().listAllUsers() });
});
app.get("/users-group/:groupName", async (req: Request, res: Response): Promise<Response> => {

    return res.send({ data: await new CognitoService().listUsersInGroup(req.params.groupName) });
});

app.post("/users/confirm", async (req: Request, res: Response) => {
    try {
        const confirmUserResponse = await new CognitoService().confirmUser(req.body.username);
        return res.send({ success: true, message: "User confirmed successfully.", data: confirmUserResponse });
    } catch (e) {
        console.log(`ErrorOccurred*confirmUser`, e);
        return res.send({ success: false, message: `Error occurred: ${e}` });
    }

});


export default app;