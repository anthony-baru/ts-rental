"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// @/connection.ts
const sequelize_typescript_1 = require("sequelize-typescript");
const path_1 = __importDefault(require("path"));
const toCamelCase_1 = require("../utils/toCamelCase");
require("dotenv/config");
require('dotenv').config();
const connection = new sequelize_typescript_1.Sequelize({
    dialect: process.env["DB_DIALECT"],
    host: process.env.DB_HOST,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    timezone: '+03:00',
    port: parseInt(process.env.DB_PORT) || 3306,
    database: "typescript-sequelize",
    models: [path_1.default.join(__dirname, "..", "models")],
    modelMatch: (filename, member) => {
        console.log(filename, member);
        return filename.substring(0, filename.indexOf('.model')) === (0, toCamelCase_1.toCamelCase)(member);
    },
    dialectOptions: {
        options: {
            useUTC: false,
        },
        useUTC: false,
        dateStrings: true,
        typeCast: function (field, next) {
            if (field.type === 'DATETIME' || field.type === 'TIMESTAMP') {
                return field.string();
            }
            return next();
        },
    }
});
exports.default = connection;
//# sourceMappingURL=connection.js.map