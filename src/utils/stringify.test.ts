import { describe, expect, test } from "vitest";
import { windowFeatures } from "./string";

describe("windowFeatures", () => {
  test("empty", () => {
    const input = "";
    const actual = windowFeatures("");
    const expected = input;
    expect(actual).toEqual(expected);
  });

  test("with values", () => {
    const input = "left=10, top=20, width=30, height=40";
    const actual = windowFeatures("left=10, top=20, width=30, height=40");
    const expected = input;
    expect(actual).toEqual(expected);
  });
});
