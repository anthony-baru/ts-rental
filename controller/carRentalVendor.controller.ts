import { Request, Response } from "express";
import Joi from "joi";
import { VehicleStatus } from "../enums/vehicleStatus.enum";
import { CarRentalVendor, ICarRentalVendor } from "../models/carRentalVendor.model";
import { CarRentalVendorVehicle } from "../models/carRentalVendorVehicle.model";
import { CognitoService } from "../services/cognito.service";
import { validateSchema } from "../utils/validator";

async function createVehicle(req: Request, res: Response) {
    try {


        //check user existence in cognito
        const schema = Joi.object({
            username: Joi.string().required().max(255).label("Cognito User Name"),
            registrationNumber: Joi.string().required().max(255).label("Registration Number"),
        });
        const result = validateSchema(req.body, schema);
        if (result) {
            return res.status(200).send({ success: false, message: result });
        }

        const vendor = await createUpdateVendor(req.body.username);
        if (vendor === null) return res.status(200).send({ success: false, message: "User not found" });



        //check if vehicle already exists
        const vehicle = await CarRentalVendorVehicle.findOne({ where: { registrationNumber: req.body.registrationNumber } });
        if (vehicle) {
            return res.status(200).send({ success: false, message: "Vehicle already exists" });
        }
        //create vehicle
        const newVehicle = await CarRentalVendorVehicle.create({
            registrationNumber: req.body.registrationNumber,
            carRentalVendorId: vendor.id,
            status: VehicleStatus.AVAILABLE,

        });

        return res.status(200).send({ success: true, message: "Vehicle created successfully.", data: newVehicle });
    } catch (error: any) {
        console.log(`ErrorOccurred*createVehicle`, error);
        return res.status(200).send({ success: false, message: error.message });

    }
}

async function getVehicle(req: Request, res: Response) {

}
async function getAllVehicles(req: Request, res: Response) { }
async function updateVehicle(req: Request, res: Response) { }
async function deleteVehicle(req: Request, res: Response) { }

async function getVendors(req: Request, res: Response) {
    return res.send({ data: await new CognitoService().listUsersInGroup("carRental") });
}

async function getVendor(req: Request, res: Response) {
    return res.send({ data: await new CognitoService().getUser(req.params.userName) });

}

async function createUpdateVendor(username: string) {
    const cognitoUser = await new CognitoService().getUser(username);
    if (!cognitoUser) return null;
    const dbVendor = await CarRentalVendor.findOne({ where: { id: username } });
    let query;
    if (!dbVendor) {
        query = CarRentalVendor.create({
            id: cognitoUser.username,
            name: cognitoUser.name,
            emailAddress: cognitoUser.email,
            phoneNumber: cognitoUser.phone,
            bankAccount: cognitoUser.bankAccountNumber,
            bankBranch: cognitoUser.bankBranch,
            bankName: cognitoUser.bankName,

        });
    } else {
        query = dbVendor.update({
            name: cognitoUser.name,
            emailAddress: cognitoUser.email,
            phoneNumber: cognitoUser.phone,
            bankAccount: cognitoUser.bankAccountNumber,
            bankBranch: cognitoUser.bankBranch,
            bankName: cognitoUser.bankName,

        }, { where: { id: username } });
    }
    return await query;

}

export default {
    getVendors, getVendor, createVehicle, getVehicle, getAllVehicles, updateVehicle, deleteVehicle
};