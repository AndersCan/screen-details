import { ScreenDetailed } from "../types";

type NeededScreenProps = Pick<
  ScreenDetailed,
  "height" | "left" | "width" | "top"
>;
type Options = {
  scaleDown: number;
};

/**
 * Get screen size and positions for displaying a "minimap" of screens.
 * Should have `position: absolute` and styled with the provided values.
 *
 * Transposes all items such that no items have a negative position left or top value
 */
export function getScreenSizes(
  // TODO: Should be typeof `ScreenDetailed.screen[0]`. Typed like this for easy testing :/
  readonlyScreens: readonly NeededScreenProps[],
  options: Options = { scaleDown: 1 },
) {
  if (readonlyScreens.length === 0) {
    return [];
  }
  const screens = [...readonlyScreens];
  // find lowest left
  const lowestLeft = Math.abs(screens.sort((a, b) => a.left - b.left)[0].left);
  // find lowest top
  const lowestTop = Math.abs(screens.sort((a, b) => a.top - b.top)[0].top);
  const { scaleDown } = options;

  return screens.map((screen) => {
    const left = (screen.left + lowestLeft) / scaleDown;
    const top = (screen.top + lowestTop) / scaleDown;

    const width = screen.width / scaleDown;
    const height = screen.height / scaleDown;

    return { screen, left, top, width, height };
  });
}
