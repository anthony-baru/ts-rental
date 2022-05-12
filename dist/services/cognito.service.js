"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CognitoService = void 0;
const AWS = __importStar(require("aws-sdk"));
AWS.config.update({ region: 'eu-west-1', accessKeyId: process.env.AWS_ACCESS_KEY_ID, secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY });
const cognitoidentityserviceprovider = new AWS.CognitoIdentityServiceProvider({ region: 'eu-west-1', apiVersion: '2016-04-18' });
const util_1 = __importDefault(require("util"));
class CognitoService {
    listUsers() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let identities = yield cognitoidentityserviceprovider.listUsers({
                    UserPoolId: process.env.AWS_COGNITO_POOL_ID,
                    // AttributesToGet: ["email", "phone_number", "name"],
                    // Filter: "email_verified=true",
                    // Limit: 60,
                })
                    .promise()
                    .then((result) => {
                    console.log(util_1.default.inspect(result, { depth: 10 }));
                    return result;
                });
                return identities.Users.map((user) => {
                    return {
                        username: user.Username,
                        name: this.reduceUserAttributes(user.Attributes, "custom:name"),
                        email: this.reduceUserAttributes(user.Attributes, "email"),
                        phone: this.reduceUserAttributes(user.Attributes, "custom:extension"),
                        role: this.reduceUserAttributes(user.Attributes, "custom:role"),
                    };
                });
            }
            catch (error) {
                console.log("Error: ", error);
                return null;
            }
        });
    }
    reduceUserAttributes(userAttributes, field) {
        return userAttributes.reduce((acc, curr) => {
            if (curr.Name === field) {
                acc = curr.Value;
            }
            return acc;
        }, "");
    }
}
exports.CognitoService = CognitoService;
//# sourceMappingURL=cognito.service.js.map