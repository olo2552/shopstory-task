"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.discardElement = void 0;
const discardElement = (array, index) => {
    return [...array].splice(index, 1);
};
exports.discardElement = discardElement;
