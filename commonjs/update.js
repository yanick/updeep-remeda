"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.omitted = void 0;
const wrap_js_1 = __importDefault(require("./wrap.js"));
const constant_js_1 = __importDefault(require("./constant.js"));
const remeda_1 = require("remeda");
const innerOmitted = { __omitted: true };
exports.omitted = (0, constant_js_1.default)(innerOmitted);
function isEmpty(object) {
    return !Object.keys(object).length;
}
function reduce(object, callback, initialValue) {
    return Object.keys(object).reduce((acc, key) => callback(acc, object[key], key), initialValue);
}
function resolveUpdates(updates, object) {
    return reduce(updates, (acc, value, key) => {
        let updatedValue = value;
        if (!Array.isArray(value) &&
            value !== null &&
            typeof value === "object") {
            updatedValue = update(object[key], value); // eslint-disable-line no-use-before-define
        }
        else if (typeof value === "function") {
            updatedValue = value(object[key]);
        }
        if (object[key] !== updatedValue) {
            acc[key] = updatedValue; // eslint-disable-line no-param-reassign
        }
        return acc;
    }, {});
}
function updateArray(updates, object) {
    const newArray = [...object];
    Object.keys(updates).forEach((key) => {
        newArray[key] = updates[key];
    });
    return newArray;
}
const isPlainObject = (value) => (value === null || value === void 0 ? void 0 : value.constructor) === Object;
/**
 * Recursively update an object or array.
 *
 * Can update with values:
 * update({ foo: 3 }, { foo: 1, bar: 2 });
 * // => { foo: 3, bar: 2 }
 *
 * Or with a function:
 * update({ foo: x => (x + 1) }, { foo: 2 });
 * // => { foo: 3 }
 *
 * @function
 * @name update
 * @param {Object|Function} updates
 * @param {Object|Array}    object to update
 * @return {Object|Array}   new object with modifications
 */
function update(object, updates) {
    if (typeof updates === "function") {
        return updates(object);
    }
    if (!isPlainObject(updates)) {
        return updates;
    }
    const defaultedObject = typeof object === "undefined" || object === null ? {} : object;
    const resolvedUpdates = resolveUpdates(updates, defaultedObject);
    if (isEmpty(resolvedUpdates)) {
        return defaultedObject;
    }
    if (Array.isArray(defaultedObject)) {
        return updateArray(resolvedUpdates, defaultedObject).filter((value) => value !== innerOmitted);
    }
    return (0, remeda_1.omitBy)(Object.assign(Object.assign({}, defaultedObject), resolvedUpdates), (value) => value === innerOmitted);
}
exports.default = (0, wrap_js_1.default)(update);
//# sourceMappingURL=update.js.map