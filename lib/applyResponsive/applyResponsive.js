"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.applyResponsive = void 0;
const range_1 = require("../utils/range");
const normalizeResponsiveOutput_1 = require("../normalizeResponsiveOutput/normalizeResponsiveOutput");
const getResponsiveParameter_1 = require("../getResponsiveParameter/getResponsiveParameter");
const isNil_1 = require("../utils/isNil");
const getScalarsForColumn = (responsiveBreakpointsForAllParameters, columnIndex) => {
    return responsiveBreakpointsForAllParameters.map((row) => (0, getResponsiveParameter_1.getResponsiveParameter)(row, columnIndex));
};
const applyResponsive = (appliedFunction) => (...responsiveBreakpoints) => {
    const longestRowLength = responsiveBreakpoints.map(responsiveBreakpoint => {
        return (responsiveBreakpoint === null || responsiveBreakpoint === void 0 ? void 0 : responsiveBreakpoint.length) || 1;
    })
        .reduce((longestRowLength, currentRow) => {
        return currentRow > longestRowLength
            ? currentRow
            : longestRowLength;
    }, 1);
    const denormalizedOutput = (0, range_1.range)(longestRowLength).map((index) => {
        if ((0, isNil_1.isNil)(responsiveBreakpoints)) {
            return null;
        }
        const parametersToApply = getScalarsForColumn(responsiveBreakpoints, index);
        return appliedFunction(...parametersToApply);
    });
    return (0, normalizeResponsiveOutput_1.normalizeResponsiveOutput)(denormalizedOutput);
};
exports.applyResponsive = applyResponsive;
