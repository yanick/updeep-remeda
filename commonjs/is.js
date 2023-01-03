"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const splitPath_js_1 = __importDefault(require("./util/splitPath.js"));
const wrap_js_1 = __importDefault(require("./wrap.js"));
function _is(object, path, predicate) {
    const parts = (0, splitPath_js_1.default)(path);
    for (const part of parts) {
        if (typeof object === "undefined")
            return false;
        object = object[part];
    }
    if (typeof predicate === "function") {
        return predicate(object);
    }
    return predicate === object;
}
exports.default = (0, wrap_js_1.default)(_is);
//# sourceMappingURL=is.js.map