"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const vitest_1 = require("vitest");
const is_js_1 = __importDefault(require("./is.js"));
(0, vitest_1.test)("returns true if path matches a value predicate", () => {
    const result = (0, is_js_1.default)({ a: { b: 4 } }, "a.b", 4);
    (0, vitest_1.expect)(result).to.be.true;
});
(0, vitest_1.test)("returns true if path matches a function predicate", () => {
    const isEven = (x) => x % 2 === 0;
    const result = (0, is_js_1.default)("a.b", isEven)({ a: { b: 6 } });
    (0, vitest_1.expect)(result).to.be.true;
});
(0, vitest_1.test)("returns false if path matches a value predicate", () => {
    const result = (0, is_js_1.default)("a.b", 4)({ a: { b: 5 } });
    (0, vitest_1.expect)(result).to.be.false;
});
(0, vitest_1.test)("returns false if path matches a function predicate", () => {
    const isEven = (x) => x % 2 === 0;
    const result = (0, is_js_1.default)("a.b", isEven)({ a: { b: 7 } });
    (0, vitest_1.expect)(result).to.be.false;
});
(0, vitest_1.test)("returns false if the path does not exist", () => {
    const result = (0, is_js_1.default)("a.b.c.d", 4)({ a: { b: {} } });
    (0, vitest_1.expect)(result).to.be.false;
});
(0, vitest_1.test)("can test for undefined", () => {
    const result = (0, is_js_1.default)("a.b.c", undefined)({ a: { b: {} } });
    (0, vitest_1.expect)(result).to.be.true;
});
(0, vitest_1.test)("tests the actual object if a blank path is given", () => {
    const result = (0, is_js_1.default)(4, "", 4);
    (0, vitest_1.expect)(result).toBeTruthy();
});
(0, vitest_1.test)("can use arrays as paths", () => {
    const result = (0, is_js_1.default)(["a", "b"], 4)({ a: { b: 4 } });
    (0, vitest_1.expect)(result).to.be.true;
});
(0, vitest_1.test)("can include array indexes in paths", () => {
    let result = (0, is_js_1.default)("a.1.b", 4)({ a: [{}, { b: 4 }] });
    (0, vitest_1.expect)(result).to.be.true;
    result = (0, is_js_1.default)(["a", 1, "b"], 4)({ a: [{}, { b: 4 }] });
    (0, vitest_1.expect)(result).to.be.true;
});
(0, vitest_1.test)("can be partially applied", () => {
    const result = (0, is_js_1.default)("a.b", 4)({ a: { b: 4 } });
    (0, vitest_1.expect)(result).to.be.true;
});
//# sourceMappingURL=is.test.js.map