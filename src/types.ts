export interface ScreenDetails {
  /** The screen the browser is on */
  currentScreen: ScreenDetailed;
  screens: ScreenDetailed[];
  addEventListener: (
    key: "screenschange",
    fn: (event: unknown) => void,
  ) => void;
}

export interface ScreenDetailed {
  availHeight: number;
  availLeft: number;
  availTop: number;
  availWidth: number;
  colorDepth: number;
  devicePixelRatio: number;
  height: number;
  isExtended: boolean;
  isInternal: boolean;
  /** Set by OS as primary */
  isPrimary: boolean;
  label: string;
  left: number;
  orientation: Orientation;
  pixelDepth: number;
  top: number;
  width: number;
}

export interface Orientation {
  angle: number;
  type: string;
  onchange: any;
}
