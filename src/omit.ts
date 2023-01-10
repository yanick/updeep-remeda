import { omit as _omit } from "remeda";
import wrap from "./wrap.js";

const sizeOf = (obj) => Object.keys(obj).length;

function omit(dataIn, toOmit) {
  const result = _omit(dataIn, toOmit);
  return sizeOf(result) === sizeOf(dataIn) ? dataIn : result;
}

export interface Omit {
  (dataIn: any, toOmit: (string | number)[]): any;
  (toOmit: (string | number)[]): (dataIn: any) => any;
}

export default wrap(omit) as Omit;
