import { identity } from "remeda";
import ifElse from "./ifElse.js";
import wrap from "./wrap.js";
function _if(object, predicate, trueUpdates) {
    return ifElse(object, predicate, trueUpdates, identity);
}
export default wrap(_if);
//# sourceMappingURL=if.js.map