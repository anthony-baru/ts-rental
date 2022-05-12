import { Column, DataType, HasMany, Model, Table } from "sequelize-typescript";
import { CarRentalVendorVehicle } from "./carRentalVendorVehicle.model";

@Table({
    tableName: "carRentalVendor",
    timestamps: true,
    paranoid: true,

})
export class CarRentalVendor extends Model<CarRentalVendor> {
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
    carRentalVendorVehicles: CarRentalVendorVehicle[] = [];

}