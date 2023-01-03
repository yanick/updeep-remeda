"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const remeda_1 = require("remeda");
const ifElse_js_1 = __importDefault(require("./ifElse.js"));
const wrap_js_1 = __importDefault(require("./wrap.js"));
function _if(object, predicate, trueUpdates) {
    return (0, ifElse_js_1.default)(object, predicate, trueUpdates, remeda_1.identity);
}
exports.default = (0, wrap_js_1.default)(_if);
//# sourceMappingURL=if.js.map