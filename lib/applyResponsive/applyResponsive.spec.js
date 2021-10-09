"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const applyResponsive_1 = require("./applyResponsive");
const constantFive = () => 5;
const responsiveConstantFive = (0, applyResponsive_1.applyResponsive)(constantFive);
const identity = (x) => x;
const responsiveIdentity = (0, applyResponsive_1.applyResponsive)(identity);
const sum = (a, b) => a + b;
const responsiveSum = (0, applyResponsive_1.applyResponsive)(sum);
const varArgsSum = (...args) => args.reduce((sum, current) => sum + current, 0);
const responsiveVarArgsSum = (0, applyResponsive_1.applyResponsive)(varArgsSum);
function getContainerWidth(containerMargin, isSnappedToEdge) {
    if (isSnappedToEdge) {
        return "100%";
    }
    return `calc(100% - ${containerMargin / 2}px)`;
}
const responsiveGetContainerWidth = (0, applyResponsive_1.applyResponsive)(getContainerWidth);
function maxValueKey(obj) {
    return Object.entries(obj).reduce((acc, current) => {
        return current[1] > acc[1] ? current : acc;
    }, [undefined, Number.MIN_VALUE])[0];
}
const responsiveMaxValueKey = (0, applyResponsive_1.applyResponsive)(maxValueKey);
describe(`applyResponsive`, () => {
    it(`should work with getcontainerwidth`, () => {
        expect(responsiveGetContainerWidth([null, 10, null, 20], [true, null, false]))
            .toStrictEqual(["100%", "calc(100% - 5px)", "calc(100% - 10px)"]);
    });
    it(`should work with maxContainerWidth`, () => {
        expect(responsiveMaxValueKey({ a: 1, b: 2, c: -1 })).toStrictEqual("b");
        expect(responsiveMaxValueKey({ bob: 200, john: -400, alice: 600 })).toStrictEqual("alice");
        expect(responsiveMaxValueKey([{ a: 1, b: 2 }, null, { a: 1, c: 3 }]))
            .toStrictEqual(["b", "c"]);
        expect(responsiveMaxValueKey([{ a: 1, b: 2 }, { d: 5 }, { a: 1, c: 3, d: 8 }]))
            .toStrictEqual(["b", "d"]);
        expect(responsiveMaxValueKey([{ a: 4, b: 2 }, { c: 3, a: 5 }, { a: 1, b: 0 }]))
            .toStrictEqual("a");
    });
    it(`should work with function that takes no parameters`, () => {
        expect(responsiveConstantFive()).toBe(5);
    });
    it(`should work with function, that takes 1 parameter`, () => {
        expect(responsiveIdentity(1)).toBe(1);
        expect(responsiveIdentity({ a: 1 })).toStrictEqual({ a: 1 });
        expect(responsiveIdentity([1, 20, null, { a: 1 }])).toStrictEqual([1, 20, { a: 1 }]);
    });
    describe(`responsive function, that takes multiple parameters`, () => {
        it(`should work with only scalars`, () => {
            expect(responsiveSum(10, 30)).toStrictEqual(40);
        });
        it(`should work with scalars and responsives mixed together`, () => {
            expect(responsiveSum(10, [null, 20, 40])).toStrictEqual([null, 30, 50]);
            expect(responsiveSum([null, 20, 40], 10)).toStrictEqual([null, 30, 50]);
        });
        it(`should work with both responsives`, () => {
            expect(responsiveSum([10, null, 20], [null, 30, 40])).toStrictEqual([40, 50, 60]);
            expect(responsiveSum([10, 20], [null, 30, 40])).toStrictEqual([40, 50, 60]);
            expect(responsiveSum([10, 20], [0, null, 30, 40])).toStrictEqual([10, null, 50, 60]);
        });
    });
    describe(`responsive function that takes varargs`, () => {
        it(`should work with only scalars`, () => {
            expect(responsiveVarArgsSum(10)).toStrictEqual(10);
            expect(responsiveVarArgsSum(10, 30)).toStrictEqual(40);
            expect(responsiveVarArgsSum(10, 30, 10)).toStrictEqual(50);
        });
        it(`should work with scalars and responsives mixed together`, () => {
            expect(responsiveVarArgsSum(10, [null, 20, 40], [20])).toStrictEqual([null, 50, 70]);
            expect(responsiveVarArgsSum([30], 10)).toStrictEqual(40);
            expect(responsiveVarArgsSum([10, null, 30], 10)).toStrictEqual([20, 40, 40]);
            expect(responsiveVarArgsSum([10, null, 30, null], [10])).toStrictEqual([null, 20, 40]);
        });
        it(`should work with both responsives`, () => {
            expect(responsiveVarArgsSum([10, null, 20], [null, 30, 40], [null, 10])).toStrictEqual([50, 60, 70]);
            expect(responsiveVarArgsSum([null, null, null, 0], [10, 20], [null, 30, 40])).toStrictEqual([40, 50, 60]);
            expect(responsiveVarArgsSum([1, null, 2, null, 3, null], [10, 20], [0, null, 30, 40]))
                .toStrictEqual([11, null, 52, 63]);
        });
    });
});
