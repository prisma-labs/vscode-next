import * as fs from "fs";
import * as path from "path";
import { workspace } from "vscode";
import { debug } from "../helpers/debug";

type PackageScopes = "devDependencies" | "dependencies" | "peerDependencies";
export async function packageJsonIncludes(
  packageName: string,
  scopes: PackageScopes[]
): Promise<boolean> {
  const rootPath = workspace.rootPath;
  const pkgPath = rootPath && path.join(rootPath, "package.json");
  debug("nextjs:packageJsonIncludes")(
    `looking for ${packageName} in ${pkgPath} in scopes ${scopes.join(",")}`
  );

  if (rootPath && pkgPath && fs.existsSync(pkgPath)) {
    let packageJSON;
    try {
      packageJSON = JSON.parse(fs.readFileSync(pkgPath, { encoding: "utf8" })); // eslint-disable-line
    } catch (e) {
      console.error(e);
      return false;
    }
    for (const scope of scopes) {
      // eslint-disable-next-line
      const dependencies = packageJSON && packageJSON[scope];
      if (dependencies) {
        const packages = Object.keys(dependencies);
        const found = packages.includes(packageName);
        if (found) {
          debug("nextjs:packageJsonIncludes")(
            `found ${packageName} in ${scope}`
          );
        }
        return found;
      }
    }
  }
  return false;
}
