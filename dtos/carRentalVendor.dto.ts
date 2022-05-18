import { VehicleStatus } from "../enums/vehicleStatus.enum";

export interface ICreateVehicleRequestDto {
    clientName: string;
}

export interface UpdateVendorVehicleBodyDto {
    registrationNumber: string;
    status: VehicleStatus;
}

export interface UpdateVendorVehicleParamsDto {
    registrationNumber: string;
    vendorId: string;
}

export interface GetVendorParamsDto {
    vendorId: string;
}