import schedule from 'node-schedule';
import { CarRentalVendor } from '../models/carRentalVendor.model';
import { CognitoService } from '../services/cognito.service';
const cognitoService = new CognitoService();

export function init() {
    let num = 0;
    schedule.scheduleJob('* * * * * *', onboardCarRentalVendors);
}

async function onboardCarRentalVendors() {
    console.log(`Running worker:onboardCarRentalVendors`);
    //find users in group carRental
    const cognitoCarRentalVendors = await cognitoService.listUsersInGroup('carRental');

    //find users in carRentalVendor table in db
    const dbCognitoCarRentalVendors = await CarRentalVendor.findAll();

    //compare users in group and users in carRentalVendor table and get missing users
    const missingCognitoCarRentalVendors = cognitoCarRentalVendors!.filter(cognitoCarRentalVendor => { return !dbCognitoCarRentalVendors.find(dbCognitoCarRentalVendor => dbCognitoCarRentalVendor.emailAddress === cognitoCarRentalVendor.email); });

    //add missing users to db
    for (const missingCognitoCarRentalVendor of missingCognitoCarRentalVendors) {
        let carRentalVendor = new CarRentalVendor();
        carRentalVendor.emailAddress = missingCognitoCarRentalVendor.email;
        carRentalVendor.name = missingCognitoCarRentalVendor.name;
        carRentalVendor.phoneNumber = missingCognitoCarRentalVendor.phone;
        carRentalVendor.kraPin = missingCognitoCarRentalVendor.kraPin;

        await carRentalVendor.save();
    }
}