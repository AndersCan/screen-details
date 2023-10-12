import { ScreenDetails } from "../types";

export function getScreenDetails(): Promise<ScreenDetails> {
  //@ts-expect-error
  return window.getScreenDetails();
}
