import wrap from "./wrap.js";
import matches from "./matches.js";
import map from "./map.js";
import ifElse from "./ifElse.js";
import { buildPredicate } from "./predicate.js";

function _mapIfElse(object, predicate, trueUpdates, falseUpdates) {
  const test = buildPredicate(predicate);

  return map(object, ifElse(test, trueUpdates, falseUpdates));
}

function mapIf(object, predicate, trueUpdates) {
  return _mapIfElse(object, predicate, trueUpdates, (x) => x);
}

export interface MapIfElse {
  (object, predicate: Predicate, trueUpdates, falseUpdates): unknown;
  (predicate: Predicate, trueUpdates, falseUpdates): (unknown) => unknown;
}

export interface MapIf {
  (object, predicate: Predicate, trueUpdates): unknown;
  (predicate: Predicate, trueUpdates): (unknown) => unknown;
}

export default wrap(mapIf) as MapIf;
export const mapIfElse = _mapIfElse as any as MapIfElse;
