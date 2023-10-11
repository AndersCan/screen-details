// sum.test.js
import { describe, expect } from "vitest";
import { getContainerSize } from "./get-container-size";

describe("getContainerSize", (test) => {
  test("simple test", () => {
    const expected = {
      width: 222,
      height: 333,
    };

    const actual = getContainerSize([
      {
        left: 0,
        top: 0,
        width: 222,
        height: 333,
      },
    ]);

    expect(actual).toStrictEqual(expected);
  });

  test("two screens left and right", () => {
    const expected = {
      width: 444,
      height: 333,
    };

    const actual = getContainerSize([
      {
        left: 0,
        top: 0,
        width: 222,
        height: 333,
      },
      {
        left: 222,
        top: 0,
        width: 222,
        height: 333,
      },
    ]);

    expect(actual).toStrictEqual(expected);
  });

  test("two screens top and bottom", () => {
    const expected = {
      width: 222,
      height: 666,
    };

    const actual = getContainerSize([
      {
        left: 0,
        top: 0,
        width: 222,
        height: 333,
      },
      {
        left: 0,
        top: 333,
        width: 222,
        height: 333,
      },
    ]);

    expect(actual).toStrictEqual(expected);
  });

  test("two screens top and bottom [diagonal]", () => {
    const screen1 = {
      left: 0,
      top: 0,
      width: 800,
      height: 600,
    };
    const screen2 = {
      left: screen1.width / 2,
      top: screen1.height / 2,
      width: 800,
      height: 600,
    };
    const expected = {
      width: screen1.width * 1.5,
      height: screen1.height * 1.5,
    };

    const actual = getContainerSize([screen1, screen2]);

    expect(actual).toStrictEqual(expected);
  });

  test("two screens left, right [main]", () => {
    const leftScreen = {
      left: -800,
      top: 0,
      width: 1600,
      height: 600,
    };
    const rightScreen = {
      left: 0,
      top: 0,
      width: 800,
      height: 600,
    };
    const expected = {
      width: 1600 + 800,
      height: 600,
    };

    const actual = getContainerSize([leftScreen, rightScreen]);

    expect(actual).toStrictEqual(expected);
  });
});
