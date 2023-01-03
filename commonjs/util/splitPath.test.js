"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const vitest_1 = require("vitest");
const splitPath_js_1 = __importDefault(require("./splitPath.js"));
(0, vitest_1.it)("treats a number as a single step path", () => {
    const path = 1;
    const result = (0, splitPath_js_1.default)(path);
    (0, vitest_1.expect)(result).to.deep.equal(["1"]);
});
(0, vitest_1.it)("handles arrays", () => {
    const path = ["foo", "bar", "x"];
    const result = (0, splitPath_js_1.default)(path);
    (0, vitest_1.expect)(result).to.equal(path);
});
(0, vitest_1.it)("handles strings separated by dots", () => {
    const path = "bar.0.y";
    const result = (0, splitPath_js_1.default)(path);
    (0, vitest_1.expect)(result).to.deep.equal(["bar", "0", "y"]);
});
//# sourceMappingURL=splitPath.test.js.map