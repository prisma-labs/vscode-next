import { SourceFile } from "ts-morph";
import { debug } from "../../helpers/debug";
import { NextFunctionName, NextFunctionType } from "./constants";

/**
 * Adds the Required NextJS type imports if they are missing
 */
export function addMissingImports(
  sourceFile: SourceFile,
  foundNextFunctions: NextFunctionType
): void {
  Object.keys(foundNextFunctions).forEach((functionName) => {
    addImportIfMissing(
      sourceFile,
      foundNextFunctions[functionName as NextFunctionName].import
    );
  });
}

export function addImportIfMissing(sourceFile: SourceFile, type: string): void {
  let nextImport = sourceFile.getImportDeclaration("next");
  let hasTypeImport = false;
  if (!nextImport) {
    debug("addImports")("has next import");
    nextImport = sourceFile.addImportDeclaration({
      moduleSpecifier: "next",
      namedImports: [type],
    });
  } else {
    debug("addImports")("no next import");
    const namedImports = nextImport.getNamedImports();
    hasTypeImport = namedImports.map((is) => is.getText()).includes(type);
    debug("addImports")({ hasTypeImport });
    if (!hasTypeImport) {
      nextImport.addNamedImport(type);
    }
  }
}
