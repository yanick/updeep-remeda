"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const vitest_1 = require("vitest");
const map_js_1 = __importDefault(require("./map.js"));
(0, vitest_1.describe)("map", () => {
    (0, vitest_1.test)("applies updates to each item in an array", () => {
        const object = [0, 1, 2];
        const inc = (x) => x + 1;
        const result = (0, map_js_1.default)(object, inc);
        (0, vitest_1.expect)(result).to.eql([1, 2, 3]);
    });
    (0, vitest_1.test)("applies updates to each value in an object", () => {
        const object = { a: 0, b: 1, c: 2 };
        const inc = (x) => x + 1;
        const result = (0, map_js_1.default)(inc)(object);
        (0, vitest_1.expect)(result).to.eql({ a: 1, b: 2, c: 3 });
    });
    (0, vitest_1.test)("can update with a regular updates object", () => {
        const object = [{ a: 0 }, { a: 0 }];
        const result = (0, map_js_1.default)({ a: 1 })(object);
        (0, vitest_1.expect)(result).to.eql([{ a: 1 }, { a: 1 }]);
    });
    (0, vitest_1.test)("returns the same object if no updates are made", () => {
        const array = [0, 1];
        const ident = (x) => x;
        let result = (0, map_js_1.default)(ident)(array);
        (0, vitest_1.expect)(result).to.equal(array);
        const object = { a: 0 };
        result = (0, map_js_1.default)(ident)(object);
        (0, vitest_1.expect)(result).to.equal(object);
    });
    (0, vitest_1.test)("passes the key or index as the second parameter to the iteratee", () => {
        const object = {
            a: { x: 0 },
            b: [3, 3],
        };
        const setToKey = (_, key) => key;
        const result = (0, map_js_1.default)(object, (0, map_js_1.default)(setToKey));
        (0, vitest_1.expect)(result).to.eql({
            a: { x: "x" },
            b: [0, 1],
        });
    });
    (0, vitest_1.test)("freezes the result", () => {
        (0, vitest_1.expect)(Object.isFrozen((0, map_js_1.default)({}, {}))).to.be.true;
    });
});
//# sourceMappingURL=map.test.js.map