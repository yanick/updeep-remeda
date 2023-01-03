export default function splitPath(path) {
    if (typeof path === "number")
        path = new String(path);
    return Array.isArray(path)
        ? path
        : path.split(".").filter((x) => x !== "");
}
//# sourceMappingURL=splitPath.js.map