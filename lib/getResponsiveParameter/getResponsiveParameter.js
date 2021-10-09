"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getResponsiveParameter = void 0;
const isNil_1 = require("../utils/isNil");
const getFirstScalarToTheRight = (breakpoints, index) => {
    if (!Array.isArray(breakpoints)) {
        return breakpoints;
    }
    for (let i = index; i < breakpoints.length; i++) {
        if (!(0, isNil_1.isNil)(breakpoints[i])) {
            return breakpoints[i];
        }
    }
    return null;
};
const getFirstScalarToTheLeft = (breakpoints, index) => {
    if (!Array.isArray(breakpoints)) {
        return breakpoints;
    }
    for (let i = index; i >= 0; i--) {
        if (!(0, isNil_1.isNil)(breakpoints[i])) {
            return breakpoints[i];
        }
    }
    return null;
};
const getResponsiveParameter = (breakpoints, index) => {
    if (!Array.isArray(breakpoints)) {
        return breakpoints;
    }
    if (!(0, isNil_1.isNil)(breakpoints[index])) {
        return breakpoints[index];
    }
    const firstScalarToTheRight = getFirstScalarToTheRight(breakpoints, index);
    return !(0, isNil_1.isNil)(firstScalarToTheRight)
        ? firstScalarToTheRight
        : getFirstScalarToTheLeft(breakpoints, index);
};
exports.getResponsiveParameter = getResponsiveParameter;
