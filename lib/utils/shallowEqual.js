"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.shallowEqual = void 0;
const isScalar_1 = require("./isScalar");
const shallowEqual = (a, b) => {
    if ((0, isScalar_1.isScalar)(a) || (0, isScalar_1.isScalar)(b)) {
        return a === b;
    }
    if (Array.isArray(a) || Array.isArray(b)) {
        return Array.isArray(a) && Array.isArray(b)
            && a.every((element, index) => {
                return (0, exports.shallowEqual)(element, b[index]);
            });
    }
    for (let key of a) {
        if (a[key] !== b[key]) {
            return true;
        }
    }
    return false;
};
exports.shallowEqual = shallowEqual;
