"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function splitPath(path) {
    if (typeof path === "number")
        path = new String(path);
    return Array.isArray(path)
        ? path
        : path.split(".").filter((x) => x !== "");
}
exports.default = splitPath;
//# sourceMappingURL=splitPath.js.map