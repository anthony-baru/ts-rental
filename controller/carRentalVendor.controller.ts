import { Request, Response } from "express";
import Joi from "joi";
import { GetVendorParamsDto, UpdateVendorVehicleBodyDto, UpdateVendorVehicleParamsDto } from "../dtos/carRentalVendor.dto";
import { VehicleStatus } from "../enums/vehicleStatus.enum";
import { CarRentalVendor } from "../models/carRentalVendor.model";
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
        if (vendor === null) return res.status(200).send({ success: false, message: "User not found." });



        //check if vehicle already exists
        const vehicle = await CarRentalVendorVehicle.findOne({ where: { registrationNumber: req.body.registrationNumber } });
        if (vehicle) {
            return res.status(200).send({ success: false, message: "Vehicle already exists." });
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
    const vendorVehicle = await CarRentalVendorVehicle.findOne({ where: { registrationNumber: req.params.registrationNumber, carRentalVendorId: req.params.vendorId } });
    if (!vendorVehicle) {
        return res.send({ success: false, message: "Vehicle not found." });
    }
    return res.send({ success: true, message: "Vehicle found.", data: vendorVehicle });
}
async function getAllVehicles(req: Request, res: Response) {
    const vehicles = await CarRentalVendorVehicle.findAll({ where: { carRentalVendorId: req.params.vendorId } });
    return res.send({ success: true, data: vehicles });
}
async function updateVehicle(req: Request<UpdateVendorVehicleParamsDto, {}, UpdateVendorVehicleBodyDto>, res: Response) {
    try {
        const vendorVehicle = await CarRentalVendorVehicle.findOne({ where: { registrationNumber: req.params.registrationNumber, carRentalVendorId: req.params.vendorId } });
        if (!vendorVehicle) {
            return res.send({ success: false, message: "Vehicle not found." });
        }

        const updatedVehicle = await CarRentalVendorVehicle.update({
            status: req.body.status,
        }, { where: { registrationNumber: req.params.registrationNumber, carRentalVendorId: req.params.vendorId }, returning: true, });

        return res.send({ success: true, message: "Vehicle updated successfully.", data: updatedVehicle[1][0] });
    } catch (error) {
        return res.send({ success: false, message: "Error occurred." });
    }


}
async function deleteVehicle(req: Request, res: Response) { }

async function getVendors(req: Request, res: Response) {
    return res.send({ data: await new CognitoService().listUsersInGroup("carRental") });
}

async function getVendor(req: Request<GetVendorParamsDto, {}, {}>, res: Response) {
    return res.send({ data: await new CognitoService().getUser(req.params.vendorId) });

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

async function updateUserRegion(req: Request, res: Response) {
    try {
        const users = await new CognitoService().listAllUsers();


        console.log(`Users to be updated:${users.length}`);
        let updateCount = 0;

        // for (const user of users) {
        //     if (user.username) {
        //         await new CognitoService().updateUserRegion(user.username, "NAIROBI");
        //         updateCount++;
        //         console.log(`User updated:${user.username}. UpdateCount: ${updateCount}/${users.length}`);
        //     }
        // }

        return res.send({ success: true, data: users.length, message: `Users updated successfully: ${updateCount}` });
    } catch (error) {
        console.log(`ErrorOccurred*updateUserRegion`, error);
        return res.send({ success: false, message: "Error occurred." });
    }

}

export default {
    getVendors, getVendor, createVehicle, getVehicle, getAllVehicles, updateVehicle, deleteVehicle, updateUserRegion
};