export interface IMakeRentalRequestDto {
    clientName: string;
    clientPhoneNumber: string;
    clientEmailAddress: string;
    clientVehicleRegistrationNumber: string;
    deliveryDate: Date;
    deliveryLocationLongitude: number;
    deliveryLocationLatitude: number;
    deliveryLocationName: string;
}

