import splitPath from "./util/splitPath.js";
import wrap from "./wrap.js";
function _is(object, path, predicate) {
    const parts = splitPath(path);
    for (const part of parts) {
        if (typeof object === "undefined")
            return false;
        object = object[part];
    }
    if (typeof predicate === "function") {
        return predicate(object);
    }
    return predicate === object;
}
export default wrap(_is);
//# sourceMappingURL=is.js.map