// @/connection.ts
import { Sequelize } from "sequelize-typescript";
import path from "path";
import { toCamelCase } from "../utils/toCamelCase";
import { Dialect } from "sequelize/types";

import 'dotenv/config';
require('dotenv').config();

let connection: Sequelize;

let postgresUrl = `postgres://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_DATABASE}`;

if (process.env.DB_DIALECT === "postgres") {
    connection = new Sequelize(postgresUrl, {
        dialect: "postgres",
        models: [path.join(__dirname, "..", "models")],
        modelMatch: (filename, member) => {
            console.log(filename, member);
            return filename.substring(0, filename.indexOf(".model")) === toCamelCase(member);
        },
    });
} else {
    connection = new Sequelize({

        dialect: process.env["DB_DIALECT"] as Dialect,
        host: process.env.DB_HOST,
        username: process.env.DB_USERNAME,
        password: process.env.DB_PASSWORD,
        timezone: '+03:00',
        port: parseInt(process.env.DB_PORT!) || 3306,

        database: process.env.DB_DATABASE,

        models: [path.join(__dirname, "..", "models")],
        modelMatch: (filename, member) => {
            console.log(filename, member);
            return filename.substring(0, filename.indexOf(".model")) === toCamelCase(member);
        },
        dialectOptions: {

            options: {
                useUTC: false,
            },
            useUTC: false,
            dateStrings: true,
            typeCast: function (field: any, next: any) { // for reading from database
                if (field.type === "DATETIME" || field.type === "TIMESTAMP") {
                    return field.string();
                }
                return next();
            },
        }
    });
}





export default connection;