"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CarRentalVendorVehicle = void 0;
const sequelize_typescript_1 = require("sequelize-typescript");
const vehicleStatus_enum_1 = require("../enums/vehicleStatus.enum");
const carRentalVendor_model_1 = require("./carRentalVendor.model");
let CarRentalVendorVehicle = class CarRentalVendorVehicle extends sequelize_typescript_1.Model {
    constructor() {
        super(...arguments);
        this.status = vehicleStatus_enum_1.VehicleStatus.UNDEFINED;
    }
};
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING,
        allowNull: false
    }),
    __metadata("design:type", String)
], CarRentalVendorVehicle.prototype, "registrationNumber", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING,
        allowNull: false
    }),
    __metadata("design:type", String)
], CarRentalVendorVehicle.prototype, "status", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING,
        allowNull: true
    }),
    __metadata("design:type", String)
], CarRentalVendorVehicle.prototype, "make", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING,
        allowNull: true
    }),
    __metadata("design:type", String)
], CarRentalVendorVehicle.prototype, "model", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.INTEGER,
        allowNull: true
    }),
    __metadata("design:type", Number)
], CarRentalVendorVehicle.prototype, "yearOfManufucture", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.INTEGER,
        allowNull: false
    }),
    (0, sequelize_typescript_1.ForeignKey)(() => carRentalVendor_model_1.CarRentalVendor),
    __metadata("design:type", Number)
], CarRentalVendorVehicle.prototype, "carRentalVendorId", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsTo)(() => carRentalVendor_model_1.CarRentalVendor),
    __metadata("design:type", carRentalVendor_model_1.CarRentalVendor)
], CarRentalVendorVehicle.prototype, "carRentalVendor", void 0);
CarRentalVendorVehicle = __decorate([
    (0, sequelize_typescript_1.Table)({
        tableName: "carRentalVendorVehicles",
        timestamps: true,
    })
], CarRentalVendorVehicle);
exports.CarRentalVendorVehicle = CarRentalVendorVehicle;
//# sourceMappingURL=carRentalVendorVehicle.model.js.map