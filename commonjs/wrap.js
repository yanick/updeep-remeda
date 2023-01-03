"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const freeze_js_1 = __importDefault(require("./freeze.js"));
const wrap = (fn) => (...args) => {
    const diff = fn.length - args.length;
    if (diff === 0) {
        return (0, freeze_js_1.default)(fn(...args));
    }
    if (diff === 1) {
        return (data) => (0, freeze_js_1.default)(fn(data, ...args));
    }
    throw new Error("Wrong number of arguments");
};
exports.default = wrap;
//# sourceMappingURL=wrap.js.map