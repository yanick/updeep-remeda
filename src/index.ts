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
import matches from "./matches.js";
import myMap from "./map.js";

const functions = {
  constant,
  filter,
  freeze,
  ifElse,
  if: _if,
  is,
  map: myMap,
  matches,
  omit,
  omitBy,
  pick,
  pickBy,
  reject,
  skip,
  update,
  updateIn,
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
  matches,
  myMap as map,
};

const merged = update;

Object.entries(functions).forEach(([k, v]) => (merged[k] = v));

export default merged as typeof merged & typeof functions;
