
import { Table, Model, Column, DataType, ForeignKey, BelongsTo, } from "sequelize-typescript";
import { Owner } from "./owner.model";


type HiddenAttributes = {
    color: string;
    eyes: string;
    legs: number;
}

@Table({
    timestamps: false,
    tableName: "dogs",
})
export class Dog extends Model {
    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    name!: string;

    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    breed!: string;

    @Column({
        type: DataType.BOOLEAN,
        allowNull: true,
        defaultValue: true,
    })
    isGoodBoy!: boolean;

    @Column({
        type: DataType.JSON,
        allowNull: true,
        defaultValue: true,
    })

    hiddenAttributes!: string;
    public get options(): HiddenAttributes {
        return JSON.parse(this.hiddenAttributes)
    }

    public set options(value: HiddenAttributes) {
        this.hiddenAttributes = JSON.stringify(value)
    }

    @Column({
        type: DataType.INTEGER,
        allowNull: false,
    })
    @ForeignKey(() => Owner)
    ownerId!: number;

    @BelongsTo(() => Owner)
    owner?: Owner
}