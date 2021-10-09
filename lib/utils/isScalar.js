"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isScalar = void 0;
const isNil_1 = require("./isNil");
const isString_1 = require("./isString");
const isScalar = (value) => {
    return (0, isNil_1.isNil)(value)
        || (0, isString_1.isString)(value)
        || typeof value === "number"
        || value === true || value === false
        || false;
};
exports.isScalar = isScalar;
