"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const update_js_1 = __importDefault(require("./update.js"));
const wrap_js_1 = __importDefault(require("./wrap.js"));
function updateIfElse(object, predicate, trueUpdates, falseUpdates) {
    const test = typeof predicate === "function" ? predicate(object) : predicate;
    const updates = test ? trueUpdates : falseUpdates;
    return (0, update_js_1.default)(object, updates);
}
exports.default = (0, wrap_js_1.default)(updateIfElse);
//# sourceMappingURL=ifElse.js.map