"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const update_js_1 = __importDefault(require("./update.js"));
const splitPath_js_1 = __importDefault(require("./util/splitPath.js"));
const wrap_js_1 = __importDefault(require("./wrap.js"));
const map_js_1 = __importDefault(require("./map.js"));
const wildcard = "*";
function reducePath(acc, key) {
    if (key === wildcard) {
        return (value) => Object.prototype.hasOwnProperty.call(value, wildcard)
            ? // If we actually have wildcard as a property, update that
                (0, update_js_1.default)(value, { [wildcard]: acc })
            : // Otherwise map over all properties
                (0, map_js_1.default)(value, acc);
    }
    return { [key]: acc };
}
function updateIn(object, path, value) {
    const updates = (0, splitPath_js_1.default)(path).reduceRight(reducePath, value);
    return (0, update_js_1.default)(object, updates);
}
exports.default = (0, wrap_js_1.default)(updateIn);
//# sourceMappingURL=updateIn.js.map