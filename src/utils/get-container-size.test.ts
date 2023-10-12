// sum.test.js
import { describe, test, expect } from "vitest";
import { getContainerSize } from "./get-container-size";

describe("getContainerSize", () => {
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
      width: 800,
      height: 600,
    };
    const rightScreen = {
      left: 0,
      top: 0,
      width: 800,
      height: 600,
    };
    const expected = {
      width: 800 + 800,
      height: 600,
    };

    const actual = getContainerSize([leftScreen, rightScreen]);

    expect(actual).toStrictEqual(expected);
  });

  test("two screens left [built-in], right [lg]", () => {
    const leftScreen = {
      left: -1680,
      top: 354,
      width: 1680,
      height: 1050,
    };
    const rightScreen = {
      left: 0,
      top: 0,
      width: 2560,
      height: 1440,
    };
    const expected = {
      width: 1680 + 2560,
      height: 1440,
    };

    const actual = getContainerSize([leftScreen, rightScreen]);

    expect(actual).toStrictEqual(expected);
  });

  test("two screens left [built-in], right [lg]", () => {
    // screen at 90 degrees
    const leftScreen = {
      left: -1440,
      top: -849,
      width: 1440,
      height: 2560,
    };

    const rightScreen = {
      left: 0,
      top: 0,
      width: 2056,
      height: 1329,
    };
    const expected = {
      width: 1440 + 2056,
      height: 2560,
    };

    const actual = getContainerSize([leftScreen, rightScreen]);

    expect(actual).toStrictEqual(expected);
  });
});
