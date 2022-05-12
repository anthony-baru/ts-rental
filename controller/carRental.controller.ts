import { Request, Response } from "express";
import { CarRentalRequest, ICarRentalRequest } from "../models/carRentalRequest.model";
import { CarRentalVendor } from "../models/carRentalVendor.model";
// const { faker } = require('@faker-js/faker');
import { faker } from '@faker-js/faker';



async function makeRequest(req: Request, res: Response) {
    try {


        let nextVendorIndex = 0;
        //check for client details in gis, policy details, benefits details
        const client = checkClient("");

        //check for last assigned vendor using email of vendor in requests
        const lastRequest = await getLastRequest();


        //choose next vendor based on the info gotten above
        const allVendors = await getAllVendors();

        if (!lastRequest) {
            nextVendorIndex = 0;
        } else {
            nextVendorIndex = (allVendors.findIndex(el => el.emailAddress === lastRequest.assignedVendorEmailAddress) + 1) % allVendors.length;
        }

        const nextVendor = allVendors[nextVendorIndex];

        //create car rental request
        const nextVendorObj = getNextVendorObj(nextVendor);
        const carRentalRequest = await createCarRentalRequest({ ...client, ...nextVendorObj });

        return res.send({ success: true, message: "Request made successfully", data: carRentalRequest });
    } catch (error) {
        console.log(error);
        return res.status(500).send({ success: false, message: "Request failed", data: error });
    }

}

function checkClient(email: string) {
    return {
        clientName: faker.name.findName(),
        clientEmailAddress: faker.internet.email(),
        clientVehicleRegistrationNumber: faker.random.alphaNumeric(4),
        clientPhoneNumber: faker.phone.phoneNumber(),
        clientVehicleMake: faker.random.alphaNumeric(10),
        clientVehicleModel: faker.random.alphaNumeric(10),
        policyNumber: faker.random.alphaNumeric(10),
        policyStartDate: faker.date.past(),
        policyEndDate: faker.date.future(),
        benefitName: faker.random.alphaNumeric(10),
        benefitNumberOfDays: 10,
        benefitSectionCode: faker.random.alphaNumeric(10),

    };
}

async function getLastRequest() {
    return await CarRentalRequest.findOne({ order: [['id', 'DESC']] });

}

async function getAllVendors() {
    let vendors = await CarRentalVendor.findAll();

    return vendors;
}

function getNextVendorObj(nextVendor: CarRentalVendor) {
    return {
        assignedVendorEmailAddress: nextVendor.emailAddress,
        assignedVendorName: nextVendor.name,
        assignedVendorPhoneNumber: nextVendor.phoneNumber,
        assignedVendorKraPin: nextVendor.kraPin,
        assignedVendorPhysicalAddress: "nextVendor.physicalAddress",
        assignedVendorBankName: nextVendor.bankName,
        assignedVendorBankAccountNumber: nextVendor.bankAccountNumber,
        assignedVendorBankAccountName: nextVendor.bankName,
        assignedVendorBankAccountBranch: nextVendor.bankBranch
    };
}

async function createCarRentalRequest(request: ICarRentalRequest) {

    return CarRentalRequest.create(request);

}

export default { makeRequest };