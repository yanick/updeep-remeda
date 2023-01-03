import { expect, describe, test } from "vitest";
import constant from "./constant.js";

test("returns what it is given... constantly", () => {
    const func: any = constant(4);

    expect(func()).to.equal(4);
    expect(func("hi")).to.equal(4);
    expect(func("hi", 8)).to.equal(4);
    expect(func(4)).to.equal(4);
});

test("freezes the result", () => {
    expect(Object.isFrozen(constant({})())).toBeTruthy();
});
