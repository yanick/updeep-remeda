import { reject as _reject } from "remeda";

import wrap from "./wrap.js";

const sizeOf = (obj) => obj.length;

function reject(dataIn, predicate) {
  const result = _reject.indexed(dataIn, predicate);
  return sizeOf(result) === sizeOf(dataIn) ? dataIn : result;
}

export default wrap(reject) as typeof _reject.indexed;
