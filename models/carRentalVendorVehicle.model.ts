import { BelongsTo, Column, DataType, ForeignKey, Model, Table } from "sequelize-typescript";
import { VehicleStatus } from "../enums/vehicleStatus.enum";
import { CarRentalVendor } from "./carRentalVendor.model";


@Table({
    tableName: "carRentalVendorVehicles",
    timestamps: true,
})

export class CarRentalVendorVehicle extends Model<Partial<CarRentalVendorVehicle>> {
    @Column({
        type: DataType.STRING,
        allowNull: false
    })
    registrationNumber!: string;

    @Column({
        type: DataType.STRING,
        allowNull: false
    })
    status: string = VehicleStatus.Available.toString();

    @Column({
        type: DataType.STRING,
        allowNull: true
    })
    make?: string;

    @Column({
        type: DataType.STRING,
        allowNull: true
    })
    model?: string;

    @Column({
        type: DataType.INTEGER,
        allowNull: true
    })
    yearOfManufucture?: number;

    @Column({
        type: DataType.INTEGER,
        allowNull: false
    })
    @ForeignKey(() => CarRentalVendor)
    carRentalVendorId!: number;

    @BelongsTo(() => CarRentalVendor)
    carRentalVendor?: CarRentalVendor;
}