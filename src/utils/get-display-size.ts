import { ScreenDetailed } from "../types";

type NeededScreenProps = Pick<
  ScreenDetailed,
  "height" | "left" | "width" | "top" | "label"
>;
type Options = {
  scaleDown: number;
};
/**
 * Transposes all items such that no items have a negative position left or top value
 */
export function getDisplaySize(
  readonlyScreens: readonly NeededScreenProps[],
  options: Options = { scaleDown: 1 },
) {
  const screens = [...readonlyScreens];
  // find lowest left
  const lowestLeft = Math.abs(
    screens.sort((a, b) => a.left - b.left)[0]?.left ?? 0,
  );
  // find lowest top
  const lowestTop = Math.abs(
    screens.sort((a, b) => a.top - b.top)[0]?.top ?? 0,
  );
  const { scaleDown } = options;

  return screens.map((screen) => {
    console.log(screen);
    const left = (screen.left + lowestLeft) / scaleDown;
    const top = (screen.top + lowestTop) / scaleDown;

    const width = screen.width / scaleDown;
    const height = screen.height / scaleDown;

    return { left, top, width, height, label: screen.label };
  });
}
