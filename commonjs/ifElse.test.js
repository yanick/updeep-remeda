"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const vitest_1 = require("vitest");
const ifElse_js_1 = __importDefault(require("./ifElse.js"));
const if_js_1 = __importDefault(require("./if.js"));
(0, vitest_1.describe)("ifElse", () => {
    (0, vitest_1.test)("does updates with the else if the predicate is false", () => {
        const object = { a: 0 };
        const result = (0, ifElse_js_1.default)(false, { b: 1 }, { b: 2 })(object);
        (0, vitest_1.expect)(result).to.eql({ a: 0, b: 2 });
    });
    (0, vitest_1.test)("updates with the true update if the predicate is true", () => {
        const object = { a: 0 };
        const result = (0, ifElse_js_1.default)(true, { b: 1 }, { b: 4 })(object);
        (0, vitest_1.expect)(result).to.eql({ a: 0, b: 1 });
    });
    (0, vitest_1.test)("will use the result of a function passed as a predicate", () => {
        const object = { a: 0 };
        const aIsThree = (x) => x.a === 3;
        const result = (0, ifElse_js_1.default)(aIsThree, { b: 1 }, { b: 4 })(object);
        (0, vitest_1.expect)(result).to.eql({ a: 0, b: 4 });
    });
    (0, vitest_1.test)("freezes the result", () => {
        (0, vitest_1.expect)(Object.isFrozen((0, ifElse_js_1.default)(true, {}, {})({}))).to.be.true;
        (0, vitest_1.expect)(Object.isFrozen((0, ifElse_js_1.default)(false, {}, {})({}))).to.be.true;
    });
});
(0, vitest_1.describe)("if", () => {
    (0, vitest_1.test)("does updates with the else if the predicate is false", () => {
        const object = { a: 0 };
        const result = (0, if_js_1.default)(false, { b: 1 })(object);
        (0, vitest_1.expect)(result).not.toHaveProperty("b");
    });
    (0, vitest_1.test)("updates with the true update if the predicate is true", () => {
        const object = { a: 0 };
        const result = (0, if_js_1.default)(true, { b: 1 })(object);
        (0, vitest_1.expect)(result).to.eql({ a: 0, b: 1 });
    });
});
//# sourceMappingURL=ifElse.test.js.map