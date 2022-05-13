import { Column, DataType, HasMany, Model, PrimaryKey, Table } from "sequelize-typescript";
import { CarRentalVendorVehicle } from "./carRentalVendorVehicle.model";

export interface ICarRentalVendor {
    id: string;
    emailAddress: string;
    name: string;
    phoneNumber: string;
    kraPin?: string;
    physicalAddress: string | null;
    bankName?: string;
    bankAccount?: string;
    bankBranch?: string;
    vehicles?: CarRentalVendorVehicle[];


}

@Table({
    tableName: "carRentalVendor",
    timestamps: true,
    paranoid: true,

})
export class CarRentalVendor extends Model<ICarRentalVendor> {

    @Column({
        type: DataType.STRING,
        allowNull: false,
        primaryKey: true,
    })
    id!: string;

    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    name!: string;

    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    emailAddress!: string;

    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    phoneNumber!: string;

    @Column({
        type: DataType.STRING,
        allowNull: true
    })
    kraPin?: string;

    @Column({
        type: DataType.STRING,
        allowNull: true
    })
    physicalAddress?: string;

    @Column({
        type: DataType.STRING,
        allowNull: true
    })
    bankName?: string;

    @Column({
        type: DataType.STRING,
        allowNull: true
    })
    bankAccountNumber?: string;


    @Column({
        type: DataType.STRING,
        allowNull: true
    })
    bankBranch?: string;

    @HasMany(() => CarRentalVendorVehicle, { foreignKey: "carRentalVendorId" })
    carRentalVendorVehicles?: CarRentalVendorVehicle[];

}