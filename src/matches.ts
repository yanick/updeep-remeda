import { purry } from "remeda";
import wrap from "./wrap.js";

function matches(target, condition) {
    if (typeof condition === "function") return condition(target);

    if (typeof condition === "object") {
        return Object.entries(condition).every(([key, value]) =>
            matches(target[key], value)
        );
    }

    return target === condition;
}

export interface Matches {
    (dataIn: any, matcher: any): boolean;
    (matcher: any): (dataIn: any) => boolean;
}

export default wrap(matches) as Matches;
