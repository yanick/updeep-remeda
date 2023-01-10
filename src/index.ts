import freeze from "./freeze.js";
import is from "./is.js";
import _if from "./if.js";
import ifElse from "./ifElse.js";
import update, { skip } from "./update.js";
import updateIn from "./updateIn.js";
import constant from "./constant.js";
import omit from "./omit.js";
import omitBy from "./omitBy.js";
import pick from "./pick.js";
import pickBy from "./pickBy.js";
import filter from "./filter.js";
import reject from "./reject.js";

const functions = {
  filter,
  reject,
  pickBy,
  pick,
  omit,
  omitBy,
  constant,
  if: _if,
  ifElse,
  is,
  freeze,
  update,
  updateIn,
  skip,
};

export {
  filter,
  reject,
  pickBy,
  pick,
  omit,
  omitBy,
  constant,
  _if as if,
  ifElse,
  is,
  freeze,
  update,
  updateIn,
  skip,
}

const merged = update;

Object.entries(functions).forEach(([k, v]) => (merged[k] = v));

export default merged as typeof merged & typeof functions;

