import { pick as _pick } from "remeda";

import wrap from "./wrap.js";

const sizeOf = (obj) => Object.keys(obj).length;

export interface UPick {
  <S extends string | number | symbol>(
    keys: S[]
  ): <O>(dataIn: O) => Pick<O, S & keyof O>;
  <S extends string | number | symbol, O>(
    dataIn: O,
    keys: S[]
  ): Pick<O, S & keyof O>;
}

function pick(dataIn, keys) {
  const result = _pick(dataIn, keys);
  return sizeOf(result) === sizeOf(dataIn) ? dataIn : result;
}

export default wrap(pick) as UPick;
