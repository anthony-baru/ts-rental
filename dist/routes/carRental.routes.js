"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const carRental_controller_1 = __importDefault(require("../controller/carRental.controller"));
const carRentalRoutes = (0, express_1.Router)();
carRentalRoutes.post("/", carRental_controller_1.default.makeRequest);
exports.default = carRentalRoutes;
//# sourceMappingURL=carRental.routes.js.map