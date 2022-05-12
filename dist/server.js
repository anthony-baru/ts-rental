"use strict";
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
const app_1 = __importDefault(require("./app"));
const connection_1 = __importDefault(require("./config/connection"));
const PORT = parseInt(process.env.PORT) || 3000;
const start = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log(connection_1.default.models);
        app_1.default.listen(PORT, () => {
            console.log(`Server started on port ${PORT}`);
        });
    }
    catch (error) {
        console.error("LOADING_ERROR", error);
        process.exit(1);
    }
});
void start();
//# sourceMappingURL=server.js.map