import wrap from "./wrap.js";
import matches from "./matches.js";
import map from "./map.js";
import ifElse from "./ifElse.js";

function _mapIfElse(object, predicate, trueUpdates, falseUpdates) {
  const test =
    typeof predicate === "function"
      ? predicate
      : typeof predicate === "object"
      ? matches(predicate)
      : predicate;

  const updates = test ? trueUpdates : falseUpdates;

  return map(object, ifElse(test, trueUpdates, falseUpdates));
}

function mapIf(object, predicate, trueUpdates) {
  return _mapIfElse(object, predicate, trueUpdates, (x) => x);
}

type Predicate = ((source: any) => boolean) | boolean | Record<string, any>;

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
