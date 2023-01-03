"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const vitest_1 = require("vitest");
const if_js_1 = __importDefault(require("./if.js"));
(0, vitest_1.describe)("if", () => {
    (0, vitest_1.test)("does not update if the predicate is false", () => {
        const object = { a: 0 };
        let result = (0, if_js_1.default)(false, { b: 1 }, object);
        (0, vitest_1.expect)(result).to.eql(object);
        result = (0, if_js_1.default)(0, false, 1);
        (0, vitest_1.expect)(result).to.eql(0);
    });
    (0, vitest_1.test)("does update if the predicate is true", () => {
        const object = { a: 0 };
        const result = (0, if_js_1.default)(true, { b: 1 })(object);
        (0, vitest_1.expect)(result).to.eql({ a: 0, b: 1 });
    });
    (0, vitest_1.test)("will use the result of a function passed as a predicate", () => {
        const object = { a: 0 };
        const aIsThree = (x) => x.a === 3;
        const result = (0, if_js_1.default)(aIsThree, { b: 1 }, object);
        (0, vitest_1.expect)(result).to.eql({ a: 0 });
    });
    (0, vitest_1.test)("freezes the result", () => {
        (0, vitest_1.expect)(Object.isFrozen((0, if_js_1.default)(true, {})({}))).to.be.true;
        (0, vitest_1.expect)(Object.isFrozen((0, if_js_1.default)(false, {})({}))).to.be.true;
    });
});
//# sourceMappingURL=if.test.js.map