import * as Debug from "debug";
import { NAMESPACE } from "./constants";
import settings from "./settings";

export function debug(context?: string) {
  if (settings.debug()) {
    Debug.enable(`${NAMESPACE}*`);
  }
  return Debug(`${NAMESPACE}${context ? `:${context}` : ""}`);
}
