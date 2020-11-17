import { workspace } from "vscode";

class Settings {
  public shouldAutoFormat(value?: boolean) {
    if (typeof value === "undefined") {
      return workspace
        .getConfiguration("prisma-labs.nextjs")
        .get("addTypesOnSave") as boolean;
    }
    return workspace
      .getConfiguration("prisma-labs.nextjs")
      .update("addTypesOnSave", value);
  }
  public hasPrompted(value?: boolean) {
    if (typeof value === "undefined") {
      return workspace
        .getConfiguration("prisma-labs.nextjs")
        .get("hasPrompted") as boolean;
    }
    return workspace
      .getConfiguration("prisma-labs.nextjs")
      .update("hasPrompted", value);
  }
}

export default new Settings();
