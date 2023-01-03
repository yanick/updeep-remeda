"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const vitest_1 = require("vitest");
const index_js_1 = __importDefault(require("./index.js"));
(0, vitest_1.it)("does not change anything if no updates are specified", () => {
    const object = { foo: 3, bar: [7, 5] };
    const result = (0, index_js_1.default)(object, {});
    (0, vitest_1.expect)(result).to.equal(object);
});
(0, vitest_1.it)("can update with fixed values", () => {
    const object = { foo: 3, bar: [7, 5] };
    const result = (0, index_js_1.default)(object, { foo: 4 });
    (0, vitest_1.expect)(result).to.deep.equal({ foo: 4, bar: [7, 5] });
});
(0, vitest_1.it)("returns the same instance if an update doesn't make changes", () => {
    const object = { foo: 3 };
    const result = (0, index_js_1.default)({ foo: 3 })(object);
    (0, vitest_1.expect)(result).to.equal(object);
});
(0, vitest_1.it)("can update a nested structure", () => {
    const object = { foo: { bar: 7, bam: 3 }, baz: 32 };
    const result = (0, index_js_1.default)({ foo: { bar: 8 } })(object);
    (0, vitest_1.expect)(result).to.deep.equal({ foo: { bar: 8, bam: 3 }, baz: 32 });
});
(0, vitest_1.it)("can update arrays", () => {
    const object = [1, 2, 3];
    const result = (0, index_js_1.default)({ 1: 7 })(object);
    (0, vitest_1.expect)(result).to.deep.equal([1, 7, 3]);
});
(0, vitest_1.it)("replaces the object outright if updates are a constant", () => {
    (0, vitest_1.expect)((0, index_js_1.default)(3)({})).to.equal(3);
    (0, vitest_1.expect)((0, index_js_1.default)(null)({})).to.be.null;
});
(0, vitest_1.it)("can add an element to an array", () => {
    const object = [];
    const result = (0, index_js_1.default)({ 0: 3 })(object);
    (0, vitest_1.expect)(result).to.eql([3]);
});
(0, vitest_1.it)("can update nested arrays", () => {
    const object = { foo: [1, 2, 3], bar: 9 };
    const result = (0, index_js_1.default)({ foo: { 1: 7 } })(object);
    (0, vitest_1.expect)(result).to.deep.equal({ foo: [1, 7, 3], bar: 9 });
});
(0, vitest_1.it)("can use functions to update values", () => {
    const inc = (i) => i + 1;
    const object = { foo: 3, bar: 4, baz: 7 };
    const result = (0, index_js_1.default)({ foo: inc, bar: inc })(object);
    (0, vitest_1.expect)(result).to.deep.equal({ foo: 4, bar: 5, baz: 7 });
});
(0, vitest_1.it)("can be partially applied", () => {
    const inc = (i) => i + 1;
    const object = { foo: 3 };
    const incFoo = (0, index_js_1.default)({ foo: inc });
    const result = incFoo(object);
    (0, vitest_1.expect)(result).to.deep.equal({ foo: 4 });
});
(0, vitest_1.it)("can update if the value is an array", () => {
    const object = {};
    const result = (0, index_js_1.default)({ foo: [0, 1] })(object);
    (0, vitest_1.expect)(result).to.deep.equal({ foo: [0, 1] });
});
(0, vitest_1.it)("can update when original object is undefined", () => {
    const result = (0, index_js_1.default)({ foo: [0, 1] })(undefined);
    (0, vitest_1.expect)(result).to.deep.equal({ foo: [0, 1] });
});
(0, vitest_1.it)("can take a function as the updater", () => {
    const result = (0, index_js_1.default)((i) => i + 1)(7);
    (0, vitest_1.expect)(result).to.eql(8);
});
(0, vitest_1.it)("deeply freezes the result", () => {
    const result = (0, index_js_1.default)({ foo: { bar: 3 } }, { foo: { bar: 0 } });
    (0, vitest_1.expect)(Object.isFrozen(result)).to.be.true;
    (0, vitest_1.expect)(Object.isFrozen(result.foo)).to.be.true;
});
(0, vitest_1.it)("assigns null values", () => {
    (0, vitest_1.expect)((0, index_js_1.default)({ isNull: null }, {})).to.eql({ isNull: null });
});
(0, vitest_1.it)("defaults to an empty object when null or undefined", () => {
    let result = (0, index_js_1.default)({ a: { b: 0 } })({ a: null });
    (0, vitest_1.expect)(result).to.eql({ a: { b: 0 } });
    result = (0, index_js_1.default)({ a: { b: 0 } })({ a: undefined });
    (0, vitest_1.expect)(result).to.eql({ a: { b: 0 } });
    result = (0, index_js_1.default)({ a: { b: 0 } })({});
    (0, vitest_1.expect)(result).to.eql({ a: { b: 0 } });
});
(0, vitest_1.it)("preserves empty objects when empty updates are specified", () => {
    const result = (0, index_js_1.default)({ a: {} })({});
    (0, vitest_1.expect)(result).to.eql({ a: {} });
});
(0, vitest_1.it)("works with date objects", () => {
    const date = new Date();
    const result = (0, index_js_1.default)({ created: date })({});
    (0, vitest_1.expect)(result).toEqual({ created: date });
});
const expectU = (update, orig, expected) => (0, vitest_1.expect)(update(orig)).to.eql(expected);
(0, vitest_1.describe)("u.omitted", () => {
    (0, vitest_1.it)("omit properties via u.omitted", () => {
        expectU((0, index_js_1.default)({ a: index_js_1.default.omitted, b: (i) => i + 1 }), { a: 1, b: 2 }, { b: 3 });
    });
    (0, vitest_1.it)("omit array and object properties", () => {
        expectU((0, index_js_1.default)({ a: index_js_1.default.omitted, b: "stuff", c: index_js_1.default.omitted }), { a: [1, 2, 3], b: "orig", c: { z: "bar" } }, { b: "stuff" });
    });
    (0, vitest_1.it)("deep omit", () => {
        expectU((0, index_js_1.default)({ a: { b: index_js_1.default.omitted, c: "stuff" } }), { a: { b: "foo", z: "bar" } }, { a: { z: "bar", c: "stuff" } });
    });
    (0, vitest_1.it)("omitting an array item filters it out", () => {
        expectU((0, index_js_1.default)({ 1: index_js_1.default.omitted }), ["a", "b", "c"], ["a", "c"]);
    });
});
//# sourceMappingURL=updeep.test.js.map