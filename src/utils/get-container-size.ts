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
  // most to the right -- left + width
  const rightAcceding = screens.sort(
    (a, b) => a.left + a.width - (b.left + b.width),
  );
  const rightest = rightAcceding[rightAcceding.length - 1];
  const right = Math.abs(rightest.left) + rightest.width;

  // find highest top (top is negative, so first is lowest)
  const topDescending = screens.sort((a, b) => a.top - b.top);
  const top = topDescending[0].top;
  // find lowest top
  const lowestAscending = screens.sort(
    (a, b) => a.top + a.height - b.top + b.height,
  );
  const lowest = lowestAscending[lowestAscending.length - 1];
  const bottom = lowest.top + lowest.height;
  console.log(left, right, rightest);
  const width = (Math.abs(left) + right) / scaleDown;
  const height = (Math.abs(top) + Math.abs(bottom)) / scaleDown;

  return { height, width };
}
