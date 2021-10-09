import {expect} from "@jest/globals";
import {getResponsiveParameter} from "./getResponsiveParameter";

describe('getResponsiveParameter function', () => {
    it('should work for scalar value', () => {
        expect(getResponsiveParameter(true, 0)).toBe(true);
        expect(getResponsiveParameter(true, 1)).toBe(true);
        expect(getResponsiveParameter(true, 10)).toBe(true);
    });

    it(`should work for boxed scalar value`, () => {
        expect(getResponsiveParameter([true], 0)).toBe(true);
        expect(getResponsiveParameter([true], 1)).toBe(true);
        expect(getResponsiveParameter([true], 10)).toBe(true);
    });

    it(`should work for array with all breakpoints defined`, () => {
        expect(getResponsiveParameter([true, null, null, false], 0)).toBe(true);
        expect(getResponsiveParameter([true, null, null, false], 1)).toBe(false);
        expect(getResponsiveParameter([true, null, null, false], 2)).toBe(false);
        expect(getResponsiveParameter([true, null, null, false], 3)).toBe(false);
    });

    it('should work for array with nulls on the end', () => {
        expect(getResponsiveParameter([true, null, false, null], 0)).toBe(true);
        expect(getResponsiveParameter([true, null, false, null, null], 1)).toBe(false);
        expect(getResponsiveParameter([true, null, false, null, null, null], 2)).toBe(false);
        expect(getResponsiveParameter([true, null, false, null, null, null], 3)).toBe(false);
        expect(getResponsiveParameter([true, null, false, null, null, null], 4)).toBe(false);
        expect(getResponsiveParameter([true, null, false, null, null, null], 10)).toBe(false);
    });

    it(`should work for objects`, () => {
        expect(getResponsiveParameter([{ a: 1}, null, {b: 2}], 0)).toStrictEqual({a: 1});
        expect(getResponsiveParameter([{ a: 1}, null, {b: 2}], 1)).toStrictEqual({b: 2});
        expect(getResponsiveParameter([{ a: 1}, null, {b: 2}], 2)).toStrictEqual({b: 2});
        expect(getResponsiveParameter([{ a: 1}, null, {b: 2}], 3)).toStrictEqual({b: 2});
    });
});
