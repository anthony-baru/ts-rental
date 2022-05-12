"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.toCamelCase = void 0;
const toCamelCase = function (str) {
    return str
        .replace(/\s(.)/g, function ($1) {
        return $1.toUpperCase();
    })
        .replace(/\s/g, "")
        .replace(/^(.)/, function ($1) {
        return $1.toLowerCase();
    });
};
exports.toCamelCase = toCamelCase;
//# sourceMappingURL=toCamelCase.js.map