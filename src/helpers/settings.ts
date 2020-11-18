import { workspace } from "vscode";
import { NAMESPACE } from "./constants";

export class ExtensionSettings {
  public debug(value?: boolean) {
    if (typeof value === "undefined") {
      return workspace.getConfiguration(NAMESPACE).get("debug") as boolean;
    }
    return workspace.getConfiguration(NAMESPACE).update("debug", value);
  }
  public nextjs = {
    shouldAutoFormat: (value?: boolean) => {
      if (typeof value === "undefined") {
        return workspace
          .getConfiguration(`${NAMESPACE}.nextjs`)
          .get("addTypesOnSave") as boolean;
      }
      return workspace
        .getConfiguration(`${NAMESPACE}.nextjs`)
        .update("addTypesOnSave", value);
    },
    hasPrompted: (value?: boolean) => {
      if (typeof value === "undefined") {
        return workspace
          .getConfiguration(`${NAMESPACE}.nextjs`)
          .get("hasPrompted") as boolean;
      }
      return workspace
        .getConfiguration(`${NAMESPACE}.nextjs`)
        .update("hasPrompted", value);
    },
  };
}

export default new ExtensionSettings();
