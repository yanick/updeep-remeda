"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const remeda_1 = require("remeda");
const update_js_1 = __importDefault(require("./update.js"));
const wrap_js_1 = __importDefault(require("./wrap.js"));
function shallowEqual(object, otherObject) {
    for (const k in otherObject) {
        if (otherObject[k] !== object[k])
            return false;
    }
    return true;
}
function map(object, iteratee) {
    const updater = typeof iteratee === "function" ? iteratee : (0, update_js_1.default)(iteratee);
    const mapper = Array.isArray(object) ? remeda_1.map.indexed : remeda_1.mapValues;
    const newObject = mapper(object, updater);
    const equal = shallowEqual(object, newObject);
    return equal ? object : newObject;
}
exports.default = (0, wrap_js_1.default)(map);
//# sourceMappingURL=map.js.map