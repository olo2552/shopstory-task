"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const normalizeResponsiveOutput_1 = require("./normalizeResponsiveOutput");
describe('normalizeResponsiveOutput', () => {
    it('should not interrupt scalars', () => {
        // todo extend for scalars
        expect((0, normalizeResponsiveOutput_1.normalizeResponsiveOutput)(10)).toBe(10);
        expect((0, normalizeResponsiveOutput_1.normalizeResponsiveOutput)(false)).toBe(false);
        expect((0, normalizeResponsiveOutput_1.normalizeResponsiveOutput)('a')).toBe('a');
    });
    it('should unpack boxed scalars', () => {
        expect((0, normalizeResponsiveOutput_1.normalizeResponsiveOutput)([10])).toBe(10);
        expect((0, normalizeResponsiveOutput_1.normalizeResponsiveOutput)([false])).toBe(false);
        expect((0, normalizeResponsiveOutput_1.normalizeResponsiveOutput)(['a'])).toBe('a');
    });
    it('should strip repetitive values', () => {
        expect((0, normalizeResponsiveOutput_1.normalizeResponsiveOutput)(['a', 'a', 'b'])).toStrictEqual([null, 'a', 'b']);
        expect((0, normalizeResponsiveOutput_1.normalizeResponsiveOutput)(['a', 'a', 'b', 'b'])).toStrictEqual([null, 'a', 'b']);
        expect((0, normalizeResponsiveOutput_1.normalizeResponsiveOutput)(['a', 'a', 'a', 'b'])).toStrictEqual([null, null, 'a', 'b']);
        expect((0, normalizeResponsiveOutput_1.normalizeResponsiveOutput)(['a', 'a', 'b', 'b', 'c'])).toStrictEqual([null, 'a', null, 'b', 'c']);
    });
    it('should strip redundant nulls into scalar', () => {
        expect((0, normalizeResponsiveOutput_1.normalizeResponsiveOutput)([null, null, 10])).toBe(10);
        expect((0, normalizeResponsiveOutput_1.normalizeResponsiveOutput)([null, null, null, 10])).toBe(10);
        expect((0, normalizeResponsiveOutput_1.normalizeResponsiveOutput)([null, null, 10, null])).toBe(10);
    });
    it('should strip redundant values from last breakpoint', () => {
        expect((0, normalizeResponsiveOutput_1.normalizeResponsiveOutput)([20, 30, 10, 10, 10])).toStrictEqual([20, 30, 10]);
    });
});
