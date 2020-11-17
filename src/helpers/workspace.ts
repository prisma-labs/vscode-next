import * as fs from "fs";
import * as path from "path";
import { workspace } from "vscode";
type PackageScopes = "devDependencies" | "dependencies" | "peerDependencies";
export async function packageJsonIncludes(
  packageName: string,
  scopes: PackageScopes[]
): Promise<boolean> {
  const rootPath = workspace.rootPath;
  const pkgPath = rootPath && path.join(rootPath, "package.json");
  if (rootPath && pkgPath && fs.existsSync(pkgPath)) {
    let packageJSON;
    try {
      packageJSON = JSON.parse(fs.readFileSync(pkgPath, {encoding: 'utf8'})); // eslint-disable-line
    } catch (e) {
      console.error(e);
      return false
    }
    for (const scope of scopes) {
      // eslint-disable-next-line
      const dependencies = packageJSON && packageJSON[scope];
      if (dependencies) {
        const packages = Object.keys(dependencies);
        return packages.includes(packageName);
      }
    }
  }
  return false;
}
