"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const freeze_js_1 = __importDefault(require("./freeze.js"));
const is_js_1 = __importDefault(require("./is.js"));
const if_js_1 = __importDefault(require("./if.js"));
const ifElse_js_1 = __importDefault(require("./ifElse.js"));
const update_js_1 = __importStar(require("./update.js"));
const updateIn_js_1 = __importDefault(require("./updateIn.js"));
const constant_js_1 = __importDefault(require("./constant.js"));
const u = update_js_1.default;
u.constant = constant_js_1.default;
u.if = if_js_1.default;
u.ifElse = ifElse_js_1.default;
u.is = is_js_1.default;
u.freeze = freeze_js_1.default;
u.update = update_js_1.default;
u.updateIn = updateIn_js_1.default;
u.omitted = update_js_1.omitted;
exports.default = u;
//# sourceMappingURL=index.js.map