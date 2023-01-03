import freeze from "./freeze.js";
import is from "./is.js";
import _if from "./if.js";
import ifElse from "./ifElse.js";
import update, { omitted } from "./update.js";
import updateIn from "./updateIn.js";
import constant from "./constant.js";
const functions = {
    constant,
    if: _if,
    ifElse,
    is,
    freeze,
    update,
    updateIn,
    omitted,
};
const merged = update;
Object.entries(functions).forEach(([k, v]) => (merged[k] = v));
export default merged;
//# sourceMappingURL=index.js.map