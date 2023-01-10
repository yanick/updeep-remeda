import { pickBy as _pick } from "remeda";

import wrap from "./wrap.js";

const sizeOf = (obj) => Object.keys(obj).length;

function pickBy(dataIn, predicate) {
  const result = _pick(dataIn, predicate);
  return sizeOf(result) === sizeOf(dataIn) ? dataIn : result;
}

export default wrap(pickBy) as typeof _pick;
