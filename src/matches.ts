import { purry } from "remeda";

function matches(target, condition) {
  if (typeof condition === "function") return condition(target);

  if (typeof condition === "object") {
    return Object.entries(condition).every(([key, value]) =>
      matches(target[key], value)
    );
  }

  return target === condition;
}

export default (...args) => purry(matches, args);
