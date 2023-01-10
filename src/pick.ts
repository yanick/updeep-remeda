import { pick as _pick } from "remeda";

import wrap from "./wrap.js";

const sizeOf = (obj) => Object.keys(obj).length;

function pick(dataIn, keys) {
  const result = _pick(dataIn, keys);
  return sizeOf(result) === sizeOf(dataIn) ? dataIn : result;
}

export default wrap(pick) as typeof _pick;
