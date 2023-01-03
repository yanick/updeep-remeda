import freeze from "./freeze.js";
const wrap = (fn) => (...args) => {
    const diff = fn.length - args.length;
    if (diff === 0) {
        return freeze(fn(...args));
    }
    if (diff === 1) {
        return (data) => freeze(fn(data, ...args));
    }
    throw new Error("Wrong number of arguments");
};
export default wrap;
//# sourceMappingURL=wrap.js.map