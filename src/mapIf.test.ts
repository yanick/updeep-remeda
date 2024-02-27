import { expect, test, describe } from "vitest";

import mapIf, { mapIfElse } from "./mapIf.js";

test("does updates with the if and else", () => {
  const object = [
    { x: 1, y: 0 },
    { x: 2, y: 0 },
    { x: 3, y: 0 },
  ];

  expect(mapIfElse(object, { x: 2 }, { y: 2 }, { y: 3 })).toEqual([
    { x: 1, y: 3 },
    { x: 2, y: 2 },
    { x: 3, y: 3 },
  ]);

  expect(mapIf(object, { x: 2 }, { y: 2 })).toEqual([
    { x: 1, y: 0 },
    { x: 2, y: 2 },
    { x: 3, y: 0 },
  ]);
});
