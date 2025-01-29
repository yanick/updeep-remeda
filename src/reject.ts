import { filter } from "remeda";
import { buildPredicate } from "./predicate.js";

import wrap from "./wrap.js";

const sizeOf = (obj) => obj.length;

function reject(dataIn, predicate) {
  const pred = buildPredicate(predicate);
  const result = filter(dataIn, (...args) => !pred(...args));
  return sizeOf(result) === sizeOf(dataIn) ? dataIn : result;
}

export default wrap(reject) as typeof filter;
