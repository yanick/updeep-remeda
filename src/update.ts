import wrap from "./wrap.js";
import constant from "./constant.js";
import * as R from "remeda";

import { omitBy, merge } from "remeda";

const innerOmitted = { __skip: true };
export const skip = constant(innerOmitted);

function isEmpty(object) {
  return !Object.keys(object).length;
}

function reduce(object, callback, initialValue) {
  return Object.keys(object).reduce(
    (acc, key) => callback(acc, object[key], key),
    initialValue
  );
}

function resolveUpdates(updates, object) {
  return reduce(
    updates,
    (acc, value, key) => {
      let updatedValue = value;

      if (
        !Array.isArray(value) &&
        value !== null &&
        typeof value === "object"
      ) {
        updatedValue = update(object[key], value); // eslint-disable-line no-use-before-define
      } else if (typeof value === "function") {
        updatedValue = value(object[key]);
      }

      if (object[key] !== updatedValue) {
        acc[key] = updatedValue; // eslint-disable-line no-param-reassign
      }

      return acc;
    },
    {}
  );
}

function updateArray(updates, object) {
  const newArray = [...object];

  Object.keys(updates).forEach((key) => {
    newArray[key] = updates[key];
  });

  return newArray;
}

const isPlainObject = (value) => value?.constructor === Object;

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

  if (Array.isArray(object) && R.isDeepEqual(object, updates)) return object;

  if (!isPlainObject(updates)) {
    return updates;
  }

  const defaultedObject =
    typeof object === "undefined" || object === null ? {} : object;

  const resolvedUpdates = resolveUpdates(updates, defaultedObject);

  Object.entries(resolvedUpdates).forEach(([key, value]) => {
    if (value === innerOmitted) {
      if (!defaultedObject.hasOwnProperty(key)) delete resolvedUpdates[key];
    }
  });

  if (isEmpty(resolvedUpdates)) {
    return defaultedObject;
  }

  if (Array.isArray(defaultedObject)) {
    return updateArray(resolvedUpdates, defaultedObject).filter(
      (value) => value !== innerOmitted
    );
  }

  return omitBy(
    merge(defaultedObject, resolvedUpdates),
    (value) => value === innerOmitted
  );
}

export interface Update {
  (object, func): any;
  (func): (object) => any;
}

export default wrap(update) as Update;
