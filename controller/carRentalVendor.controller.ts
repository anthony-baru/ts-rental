import { Request, Response } from "express";
import { CognitoService } from "../services/cognito.service";

async function createVehicle(req: Request, res: Response) {
    //check user existence in cognito

    //check if vehicle already exists
    //create vehicle

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


export default {
    getVendors, getVendor, createVehicle, getVehicle, getAllVehicles, updateVehicle, deleteVehicle
};