import update from "./update.js";
import wrap from "./wrap.js";
import { Predicate, buildPredicate } from "./predicate.js";

function updateIfElse(object, predicate, trueUpdates, falseUpdates) {
  const test = buildPredicate(predicate)(object);

  const updates = test ? trueUpdates : falseUpdates;

  return update(object, updates);
}

export interface IfElse {
  (object, predicate: Predicate, trueUpdates, falseUpdates): unknown;
  (predicate: Predicate, trueUpdates, falseUpdates): (unknown) => unknown;
}

export default wrap(updateIfElse) as IfElse;
