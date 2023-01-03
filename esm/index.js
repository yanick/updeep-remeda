import freeze from "./freeze.js";
import is from "./is.js";
import _if from "./if.js";
import ifElse from "./ifElse.js";
import update, { omitted } from "./update.js";
import updateIn from "./updateIn.js";
import constant from "./constant.js";
const u = update;
u.constant = constant;
u.if = _if;
u.ifElse = ifElse;
u.is = is;
u.freeze = freeze;
u.update = update;
u.updateIn = updateIn;
u.omitted = omitted;
export default u;
//# sourceMappingURL=index.js.map