import { mapValues } from "remeda";

import update from "./update.js";
import splitPath from "./util/splitPath.js";
import wrap from "./wrap.js";
import map from "./map.js";

const wildcard = "*";

function reducePath(acc, key) {
  if (key === wildcard) {
    return (value) =>
      Object.prototype.hasOwnProperty.call(value, wildcard)
        ? // If we actually have wildcard as a property, update that
          update(value, { [wildcard]: acc })
        : // Otherwise map over all properties
          map(value, acc);
  }

  return { [key]: acc };
}

function updateIn(object, path, value) {
  const updates = splitPath(path).reduceRight(reducePath, value);

  return update(object, updates);
}

export interface UpdateIn {
  (object, path, value): any;
  (path, value): (object) => any;
}

export default wrap(updateIn) as UpdateIn;
