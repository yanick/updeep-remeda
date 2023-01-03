import freeze from "./freeze.js";
import constant from "./constant.js";
declare const _default: import("./update.js").Update & {
    constant: typeof constant;
    if: import("./if.js").If;
    ifElse: import("./ifElse.js").IfElse;
    is: import("./is.js").Is;
    freeze: typeof freeze;
    update: import("./update.js").Update;
    updateIn: import("./updateIn.js").UpdateIn;
    omitted: () => Readonly<{
        __omitted: boolean;
    }>;
};
export default _default;
//# sourceMappingURL=index.d.ts.map