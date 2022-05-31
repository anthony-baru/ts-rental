import { Table, Model, Column, DataType, HasMany, PrimaryKey, } from "sequelize-typescript";
import { RequestStatus } from "../enums/requestStatus";

export interface ICarRentalRequest {
    clientName: string;
    clientPhoneNumber: string;
    clientEmailAddress: string;
    clientVehicleRegistrationNumber: string;
    clientVehicleMake?: string;
    clientVehicleModel?: string;
    status: RequestStatus;
    deliveryDate: Date;
    deliveryLocationLongitude: number;
    deliveryLocationLatitude: number;
    deliveryLocationName: string;
    requestStartDate?: Date;
    requestEndDate?: Date;
    policyNumber: string;
    policyStartDate: Date;
    policyEndDate: Date;
    benefitName?: string;
    benefitNumberOfDays: number;
    benefitSectionCode?: string;
    assignedVendorEmailAddress: string;
    assignedVendorName: string;
    assignedVendorPhoneNumber: string;
    assignedVendorKRAPin?: string;
    assignedVendorPhysicalAddress?: string;
    assignedVendorBankName?: string;
    assignedVendorBankAccount?: string;
    assignedVendorBankBranch?: string;
    invoiceAmount?: number;
}



@Table({
    timestamps: true,
    tableName: "carRentalRequests",
})
export class CarRentalRequest extends Model<ICarRentalRequest> {

    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    clientName!: string;

    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    clientPhoneNumber!: string;


    @Column({
        type: DataType.STRING,
        allowNull: true,
    })
    clientEmailAddress!: string;


    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    clientVehicleRegistrationNumber!: string;

    @Column({
        type: DataType.STRING,
        allowNull: true,
    })
    clientVehicleMake?: string;

    @Column({
        type: DataType.STRING,
        allowNull: true,
    })
    clientVehicleModel?: string;

    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    status!: RequestStatus;

    @Column({
        type: DataType.DATE,
        allowNull: true,
    })
    requestStartDate?: Date;

    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    deliveryDate!: string;

    @Column({
        type: DataType.DOUBLE,
        allowNull: false,
    })
    deliveryLocationLongitude!: number;

    @Column({
        type: DataType.DOUBLE,
        allowNull: false,
    })
    deliveryLocationLatitude!: number;

    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    deliveryLocationName!: string;

    @Column({
        type: DataType.DATE,
        allowNull: true,
    })
    requestEndDate?: Date;

    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    policyNumber!: string;

    @Column({
        type: DataType.DATE,
        allowNull: false,
    })
    policyStartDate!: Date;

    @Column({
        type: DataType.DATE,
        allowNull: false,
    })
    policyEndDate!: Date;

    @Column({
        type: DataType.STRING,
        allowNull: true,
    })
    benefitName?: string;

    @Column({
        type: DataType.INTEGER,
        allowNull: false,
    })
    benefitNumberOfDays!: number;

    @Column({
        type: DataType.STRING,
        allowNull: true,
    })
    benefitSectionCode?: string;

    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    assignedVendorEmailAddress!: string;

    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    assignedVendorName!: string;

    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    assignedVendorPhoneNumber!: string;

    @Column({
        type: DataType.STRING,
        allowNull: true,
    })
    assignedVendorKRAPin?: string;

    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    assignedVendorPhysicalAddress!: string;

    @Column({
        type: DataType.STRING,
        allowNull: true,
    })
    assignedVendorBankName?: string;


    @Column({
        type: DataType.STRING,
        allowNull: true,
    })
    assignedVendorBankAccount?: string;

    @Column({
        type: DataType.STRING,
        allowNull: true,
    })
    assignedVendorBankBranch?: string;

    @Column({
        type: DataType.DOUBLE(11, 2),
        allowNull: true,
    })
    invoiceAmount?: number;





    // @Column({
    //     type: DataType.STRING,
    //     allowNull: true,
    //     defaultValue: "0000",
    // })
    // phoneNumber: string = "0000";

    // @HasMany(() => Dog)
    // dogs: Dog[] = []
}