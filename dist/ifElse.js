import update from "./update.js";
import wrap from "./wrap.js";
function updateIfElse(object, predicate, trueUpdates, falseUpdates) {
    const test = typeof predicate === "function" ? predicate(object) : predicate;
    const updates = test ? trueUpdates : falseUpdates;
    return update(object, updates);
}
export default wrap(updateIfElse);
//# sourceMappingURL=ifElse.js.map