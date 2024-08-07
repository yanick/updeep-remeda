import { omitBy as _omitBy } from "remeda";
import { buildPredicate } from "./predicate.js";

import wrap from "./wrap.js";

const sizeOf = (obj) => Object.keys(obj).length;

function omitBy(dataIn, predicate) {
  const result = _omitBy(dataIn, buildPredicate(predicate));
  return sizeOf(result) === sizeOf(dataIn) ? dataIn : result;
}

export default wrap(omitBy) as typeof _omitBy;
