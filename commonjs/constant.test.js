"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const vitest_1 = require("vitest");
const constant_js_1 = __importDefault(require("./constant.js"));
(0, vitest_1.test)("returns what it is given... constantly", () => {
    const func = (0, constant_js_1.default)(4);
    (0, vitest_1.expect)(func()).to.equal(4);
    (0, vitest_1.expect)(func("hi")).to.equal(4);
    (0, vitest_1.expect)(func("hi", 8)).to.equal(4);
    (0, vitest_1.expect)(func(4)).to.equal(4);
});
(0, vitest_1.test)("freezes the result", () => {
    (0, vitest_1.expect)(Object.isFrozen((0, constant_js_1.default)({})())).toBeTruthy();
});
//# sourceMappingURL=constant.test.js.map