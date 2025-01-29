import { mapValues, map as _map } from "remeda";

import update from "./update.js";
import wrap from "./wrap.js";

function shallowEqual(object, otherObject) {
  for (const k in otherObject) {
    if (otherObject[k] !== object[k]) return false;
  }
  return true;
}

function map(object, iteratee) {
  const updater = typeof iteratee === "function" ? iteratee : update(iteratee);

  const mapper: any = Array.isArray(object) ? _map : mapValues;

  const newObject = mapper(object, updater);
  const equal = shallowEqual(object, newObject);

  return equal ? object : newObject;
}

export interface Map {
  (object, iteratee): any;
  (iteratee): (object) => any;
}

export default wrap(map) as Map;
