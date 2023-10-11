import { ScreenDetailed } from "../types";

type NeededScreenProps = Pick<
  ScreenDetailed,
  "height" | "left" | "width" | "top"
>;
type Options = {
  scaleDown: number;
};
export function getContainerSize(
  readonlyScreens: NeededScreenProps[],
  options: Options = { scaleDown: 1 },
) {
  const { scaleDown } = options;
  const screens = [...readonlyScreens];
  const leftAscending = screens.sort((a, b) => a.left - b.left);
  // find lowest left
  const left = leftAscending[0].left;
  // find highest left + width = right
  const rightDescending = screens.sort(
    (a, b) => a.left + a.width - b.left + b.width,
  );
  const rightest = rightDescending[rightDescending.length - 1];
  const right = rightest.left + rightest.width;

  const topAscending = screens.sort((a, b) => a.top - b.top);
  // find highest top
  const top = topAscending[topAscending.length - 1].top;

  // find lowest top
  const lowestAscending = screens.sort(
    (a, b) => a.top + a.height - b.top + b.height,
  );
  console.log({ lowestAscending });
  const lowest = lowestAscending[0];
  const bottom = lowest.top + lowest.height;

  console.log({ left, right, top, bottom });

  const width = (Math.abs(left) + right) / scaleDown;

  const height = (Math.abs(top) + Math.abs(bottom)) / scaleDown;

  return { height, width };
}
