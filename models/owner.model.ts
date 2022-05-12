import { Table, Model, Column, DataType, HasMany, } from "sequelize-typescript";

import { Dog } from "./dog.model";

@Table({
    timestamps: true,
    tableName: "owners",
})
export class Owner extends Model {
    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    name!: string;

    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    location!: string;


    @Column({
        type: DataType.STRING,
        allowNull: false
    })
    email!: string;

    @Column({
        type: DataType.STRING,
        allowNull: true,
        defaultValue: "0000",
    })
    phoneNumber: string = "0000";

    @HasMany(() => Dog)
    dogs: Dog[] = []
}