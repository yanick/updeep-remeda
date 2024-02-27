import { filter as _filter } from "remeda";
import { buildPredicate } from "./predicate.js";

import wrap from "./wrap.js";

const sizeOf = (obj) => obj.length;

function filter(dataIn, predicate) {
  const result = _filter.indexed(dataIn, buildPredicate(predicate));
  return sizeOf(result) === sizeOf(dataIn) ? dataIn : result;
}

export default wrap(filter) as typeof _filter.indexed;
