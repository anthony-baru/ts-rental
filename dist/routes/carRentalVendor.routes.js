"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const carRentalVendor_controller_1 = __importDefault(require("../controller/carRentalVendor.controller"));
const carRentalVendorRoutes = (0, express_1.Router)();
carRentalVendorRoutes.get("/", (req, res) => {
    return res.json({ message: "Hi from car rental routes 👍👍👍👍 " });
});
carRentalVendorRoutes.post("/vehicle", carRentalVendor_controller_1.default.createVehicle);
exports.default = carRentalVendorRoutes;
//# sourceMappingURL=carRentalVendor.routes.js.map