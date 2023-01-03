import original from "updeep";
import contender from "./index.js";

import { bench } from "vitest";

bench("original, simple update", () => {
  (original as any)({ a: 1 })({ a: 2, b: 3 });
});

bench("contender, simple update", () => {
  contender({ a: 1 })({ a: 2, b: 3 });
});
