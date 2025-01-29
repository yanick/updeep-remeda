import ifElse from "./ifElse.js";
import wrap from "./wrap.js";

const identity = (x: unknown) => x;

export interface If {
  (object, predicate, trueUpdates): unknown;
  (predicate, trueUpdates): (unknown) => unknown;
}

function _if(object, predicate, trueUpdates) {
  return ifElse(object, predicate, trueUpdates, identity);
}

export default wrap(_if) as If;
