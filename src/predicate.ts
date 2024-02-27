import matches from "./matches.js";

export type Predicate =
  | ((source: any) => boolean)
  | boolean
  | Record<string, any>;

export function buildPredicate(predicate) {
  if (typeof predicate === "function") return predicate;
  if (typeof predicate === "object") return matches(predicate);
  return () => !!predicate;
}
