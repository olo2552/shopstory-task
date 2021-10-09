"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const globals_1 = require("@jest/globals");
const getResponsiveParameter_1 = require("./getResponsiveParameter");
describe('getResponsiveParameter function', () => {
    it('should work for scalar value', () => {
        (0, globals_1.expect)((0, getResponsiveParameter_1.getResponsiveParameter)(true, 0)).toBe(true);
        (0, globals_1.expect)((0, getResponsiveParameter_1.getResponsiveParameter)(true, 1)).toBe(true);
        (0, globals_1.expect)((0, getResponsiveParameter_1.getResponsiveParameter)(true, 10)).toBe(true);
    });
    it(`should work for boxed scalar value`, () => {
        (0, globals_1.expect)((0, getResponsiveParameter_1.getResponsiveParameter)([true], 0)).toBe(true);
        (0, globals_1.expect)((0, getResponsiveParameter_1.getResponsiveParameter)([true], 1)).toBe(true);
        (0, globals_1.expect)((0, getResponsiveParameter_1.getResponsiveParameter)([true], 10)).toBe(true);
    });
    it(`should work for array with all breakpoints defined`, () => {
        (0, globals_1.expect)((0, getResponsiveParameter_1.getResponsiveParameter)([true, null, null, false], 0)).toBe(true);
        (0, globals_1.expect)((0, getResponsiveParameter_1.getResponsiveParameter)([true, null, null, false], 1)).toBe(false);
        (0, globals_1.expect)((0, getResponsiveParameter_1.getResponsiveParameter)([true, null, null, false], 2)).toBe(false);
        (0, globals_1.expect)((0, getResponsiveParameter_1.getResponsiveParameter)([true, null, null, false], 3)).toBe(false);
    });
    it('should work for array with nulls on the end', () => {
        (0, globals_1.expect)((0, getResponsiveParameter_1.getResponsiveParameter)([true, null, false, null], 0)).toBe(true);
        (0, globals_1.expect)((0, getResponsiveParameter_1.getResponsiveParameter)([true, null, false, null, null], 1)).toBe(false);
        (0, globals_1.expect)((0, getResponsiveParameter_1.getResponsiveParameter)([true, null, false, null, null, null], 2)).toBe(false);
        (0, globals_1.expect)((0, getResponsiveParameter_1.getResponsiveParameter)([true, null, false, null, null, null], 3)).toBe(false);
        (0, globals_1.expect)((0, getResponsiveParameter_1.getResponsiveParameter)([true, null, false, null, null, null], 4)).toBe(false);
        (0, globals_1.expect)((0, getResponsiveParameter_1.getResponsiveParameter)([true, null, false, null, null, null], 10)).toBe(false);
    });
    it(`should work for objects`, () => {
        (0, globals_1.expect)((0, getResponsiveParameter_1.getResponsiveParameter)([{ a: 1 }, null, { b: 2 }], 0)).toStrictEqual({ a: 1 });
        (0, globals_1.expect)((0, getResponsiveParameter_1.getResponsiveParameter)([{ a: 1 }, null, { b: 2 }], 1)).toStrictEqual({ b: 2 });
        (0, globals_1.expect)((0, getResponsiveParameter_1.getResponsiveParameter)([{ a: 1 }, null, { b: 2 }], 2)).toStrictEqual({ b: 2 });
        (0, globals_1.expect)((0, getResponsiveParameter_1.getResponsiveParameter)([{ a: 1 }, null, { b: 2 }], 3)).toStrictEqual({ b: 2 });
    });
});
