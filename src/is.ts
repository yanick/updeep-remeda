import splitPath from "./util/splitPath.js";
import wrap from "./wrap.js";

function _is(
  object,
  path: number | string | (number | string)[],
  predicate
): boolean {
  const parts = splitPath(path);

  for (const part of parts) {
    if (typeof object === "undefined") return false;
    object = object[part];
  }

  if (typeof predicate === "function") {
    return predicate(object);
  }

  return predicate === object;
}

export interface Is {
  (object, path: string | number | (number | string)[], predicate): boolean;
  (path: string | number | (number | string)[], predicate): (object) => boolean;
}

export default wrap(_is) as Is;
