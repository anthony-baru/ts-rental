"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const carRentalRequest_model_1 = require("../models/carRentalRequest.model");
const carRentalVendor_model_1 = require("../models/carRentalVendor.model");
// const { faker } = require('@faker-js/faker');
const faker_1 = require("@faker-js/faker");
const requestStatus_1 = require("../enums/requestStatus");
function makeRequest(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            let nextVendorIndex = 0;
            //check for client details in gis, policy details, benefits details
            const client = checkClient("");
            //check for last assigned vendor using email of vendor in requests
            const lastRequest = yield getLastRequest();
            //choose next vendor based on the info gotten above
            const allVendors = yield getAllVendors();
            if (!lastRequest) {
                nextVendorIndex = 0;
            }
            else {
                nextVendorIndex = (allVendors.findIndex(el => el.emailAddress === lastRequest.assignedVendorEmailAddress) + 1) % allVendors.length;
            }
            const nextVendor = allVendors[nextVendorIndex];
            //create car rental request
            const nextVendorObj = getNextVendorObj(nextVendor);
            const carRentalRequest = yield createCarRentalRequest(Object.assign(Object.assign(Object.assign({}, client), nextVendorObj), { status: requestStatus_1.RequestStatus.BOOKED }));
            return res.send({ success: true, message: "Request made successfully", data: carRentalRequest });
        }
        catch (error) {
            console.log(error);
            return res.status(500).send({ success: false, message: "Request failed", data: error });
        }
    });
}
function checkClient(email) {
    return {
        clientName: faker_1.faker.name.findName(),
        clientEmailAddress: faker_1.faker.internet.email(),
        clientVehicleRegistrationNumber: faker_1.faker.random.alphaNumeric(4),
        clientPhoneNumber: faker_1.faker.phone.phoneNumber(),
        clientVehicleMake: faker_1.faker.random.alphaNumeric(10),
        clientVehicleModel: faker_1.faker.random.alphaNumeric(10),
        policyNumber: faker_1.faker.random.alphaNumeric(10),
        policyStartDate: faker_1.faker.date.past(),
        policyEndDate: faker_1.faker.date.future(),
        benefitName: faker_1.faker.random.alphaNumeric(10),
        benefitNumberOfDays: 10,
        benefitSectionCode: faker_1.faker.random.alphaNumeric(10),
    };
}
function getLastRequest() {
    return __awaiter(this, void 0, void 0, function* () {
        return yield carRentalRequest_model_1.CarRentalRequest.findOne({ order: [['id', 'DESC']] });
    });
}
function getAllVendors() {
    return __awaiter(this, void 0, void 0, function* () {
        let vendors = yield carRentalVendor_model_1.CarRentalVendor.findAll();
        return vendors;
    });
}
function getNextVendorObj(nextVendor) {
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
function createCarRentalRequest(request) {
    return __awaiter(this, void 0, void 0, function* () {
        return carRentalRequest_model_1.CarRentalRequest.create(request);
    });
}
exports.default = { makeRequest };
//# sourceMappingURL=carRental.controller.js.map