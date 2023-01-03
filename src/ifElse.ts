import update from "./update.js";
import wrap from "./wrap.js";

function updateIfElse(object, predicate, trueUpdates, falseUpdates) {
  const test = typeof predicate === "function" ? predicate(object) : predicate;

  const updates = test ? trueUpdates : falseUpdates;

  return update(object, updates);
}

type Predicate = ((source: any) => boolean) | boolean;

interface IfElse {
  (object, predicate: Predicate, trueUpdates, falseUpdates): unknown;
  (predicate: Predicate, trueUpdates, falseUpdates): (unknown) => unknown;
}

export default wrap(updateIfElse) as IfElse;
