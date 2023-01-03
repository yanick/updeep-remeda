"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const updeep_1 = __importDefault(require("updeep"));
const index_js_1 = __importDefault(require("./index.js"));
const vitest_1 = require("vitest");
(0, vitest_1.bench)("original, simple update", () => {
    updeep_1.default({ a: 1 })({ a: 2, b: 3 });
});
(0, vitest_1.bench)("contender, simple update", () => {
    (0, index_js_1.default)({ a: 1 })({ a: 2, b: 3 });
});
//# sourceMappingURL=updeep.bench.js.map