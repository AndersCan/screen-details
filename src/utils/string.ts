type StringDirs = WindowFeatureBools | WindowFeatureNums;

type WindowFeatureBools = "popup" | "noopener" | "noreferrer";

type WindowFeatureNums =
  | `width=${number}`
  | `height=${number}`
  | `left=${number}`
  | `top=${number}`;

type Recursive<
  LegalType extends string,
  Type extends string,
> = Type extends LegalType
  ? Type
  : Type extends `${infer Part1}, ${infer Part2}`
  ? Part1 extends LegalType
    ? `${Part1}, ${Recursive<LegalType, Part2>}`
    : never
  : never;

/**
 * Typesafe windowFeatures string
 *
 * @documentation https://developer.mozilla.org/en-US/docs/Web/API/Window/open#windowfeatures
 * @example windowFeatures('left=10, top=10');
 */
export function windowFeatures<T extends string>(
  typesafeString: Recursive<StringDirs, T> | "",
) {
  return typesafeString;
}

/**
 * - `_self` the current browsing context. (Default)
 * - `_blank` usually a new tab, but users can configure browsers to open a new window instead.
 * - `_parent` the parent browsing context of the current one. If no parent, behaves as _self.
 * - `_top` the topmost browsing context (the "highest" context that's an ancestor of the current one). If no ancestors, behaves as _self.
 */
export function target(target: "_self" | "_blank" | "_parent" | "_top") {
  return target;
}
