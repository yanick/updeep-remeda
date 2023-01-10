import { test, expect } from "vitest";

import matches from "./matches.js";

test("basic", () => {
  expect(matches(1, 1)).toBeTruthy();
  expect(matches(1, 2)).not.toBeTruthy();
  expect(matches({ a: 1, b: 2 }, { a: 1 })).toBeTruthy();
  expect(matches({ a: 2, b: 2 }, { a: 1 })).not.toBeTruthy();
  expect(matches({ 2: { a: (x) => x > 2 } })([1, 1, { a: 3 }])).toBeTruthy();
});
