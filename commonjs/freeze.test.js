"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const vitest_1 = require("vitest");
const freeze_js_1 = __importDefault(require("./freeze.js"));
(0, vitest_1.describe)("freeze", () => {
    (0, vitest_1.afterEach)(() => {
        delete process.env.NODE_ENV;
    });
    (0, vitest_1.test)("freezes objects", () => {
        const object = {};
        (0, freeze_js_1.default)(object);
        (0, vitest_1.expect)(Object.isFrozen(object)).to.be.true;
    });
    (0, vitest_1.test)("freezes nested objects", () => {
        const object = { foo: { bar: 3 } };
        (0, freeze_js_1.default)(object);
        (0, vitest_1.expect)(Object.isFrozen(object.foo)).to.be.true;
    });
    (0, vitest_1.test)("freezes nested arrays", () => {
        const object = [[0]];
        (0, freeze_js_1.default)(object);
        (0, vitest_1.expect)(Object.isFrozen(object)).to.be.true;
        (0, vitest_1.expect)(Object.isFrozen(object[0])).to.be.true;
    });
    (0, vitest_1.test)("ignores functions", () => {
        const object = { foo: () => 1 };
        (0, freeze_js_1.default)(object);
        (0, vitest_1.expect)(Object.isFrozen(object.foo)).to.be.false;
    });
    (0, vitest_1.test)("ignores regexps", () => {
        const object = { foo: /\d/ };
        (0, freeze_js_1.default)(object);
        (0, vitest_1.expect)(Object.isFrozen(object.foo)).to.be.false;
    });
    (0, vitest_1.test)("does not freeze children if the parent is already frozen", () => {
        const object = { foo: {} };
        Object.freeze(object);
        (0, freeze_js_1.default)(object);
        (0, vitest_1.expect)(Object.isFrozen(object.foo)).to.be.false;
    });
    (0, vitest_1.test)("does not freeze in production", () => {
        process.env.NODE_ENV = "production";
        const object = {};
        (0, freeze_js_1.default)(object);
        (0, vitest_1.expect)(Object.isFrozen(object)).to.be.false;
    });
    (0, vitest_1.test)("handles null objects", () => {
        const object = { foo: null };
        (0, freeze_js_1.default)(object);
        (0, vitest_1.expect)(Object.isFrozen(object)).to.be.true;
    });
    (0, vitest_1.test)("returns the same object", () => {
        const object = {};
        const result = (0, freeze_js_1.default)(object);
        (0, vitest_1.expect)(result).to.equal(object);
    });
});
//# sourceMappingURL=freeze.test.js.map