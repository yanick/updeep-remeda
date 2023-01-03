"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const vitest_1 = require("vitest");
const updateIn_js_1 = __importDefault(require("./updateIn.js"));
(0, vitest_1.describe)("updateIn", () => {
    (0, vitest_1.test)("can update a single path described with a string", () => {
        const object = { a: { b: 0 } };
        const result = (0, updateIn_js_1.default)("a.b", 3)(object);
        (0, vitest_1.expect)(result).to.eql({ a: { b: 3 } });
    });
    (0, vitest_1.test)("can update a single path described with a string with a function", () => {
        const inc = (x) => x + 1;
        const object = { a: { b: 0 } };
        const result = (0, updateIn_js_1.default)("a.b", inc)(object);
        (0, vitest_1.expect)(result).to.eql({ a: { b: 1 } });
    });
    (0, vitest_1.test)("can update a single path described with an array", () => {
        const object = { a: { b: 0 } };
        const result = (0, updateIn_js_1.default)(["a", "b"], 3)(object);
        (0, vitest_1.expect)(result).to.eql({ a: { b: 3 } });
    });
    (0, vitest_1.test)("can update arrays", () => {
        const object = { a: [0, 0, 0] };
        const result = (0, updateIn_js_1.default)("a.1", 3)(object);
        (0, vitest_1.expect)(result).to.eql({ a: [0, 3, 0] });
    });
    (0, vitest_1.test)("can be partially applied", () => {
        const object = { a: { b: 0 } };
        const result = (0, updateIn_js_1.default)("a.b", 3)(object);
        (0, vitest_1.expect)(result).to.eql({ a: { b: 3 } });
    });
    (0, vitest_1.test)("replaces the object outright if the path is empty", () => {
        const object = {};
        const result = (0, updateIn_js_1.default)("", 3)(object);
        (0, vitest_1.expect)(result).to.equal(3);
    });
    (0, vitest_1.test)("freezes the result", () => {
        (0, vitest_1.expect)(Object.isFrozen((0, updateIn_js_1.default)("a", 0)({}))).to.be.true;
    });
    (0, vitest_1.test)("can multiple elements of an array with *", () => {
        let object = { a: [{ b: 0 }, { b: 1 }, { b: 2 }] };
        let result = (0, updateIn_js_1.default)("a.*.b", (x) => x + 1)(object);
        (0, vitest_1.expect)(result).to.eql({ a: [{ b: 1 }, { b: 2 }, { b: 3 }] });
        object = { a: [0, 1, 2] };
        result = (0, updateIn_js_1.default)(["a", "*"], (x) => x + 1)(object);
        (0, vitest_1.expect)(result).to.eql({ a: [1, 2, 3] });
    });
    (0, vitest_1.test)("can update properties named *", () => {
        const object = { "*": 1, x: 1 };
        const result = (0, updateIn_js_1.default)("*", (x) => x + 1)(object);
        (0, vitest_1.expect)(result).to.eql({ "*": 2, x: 1 });
    });
});
//# sourceMappingURL=updateIn.test.js.map