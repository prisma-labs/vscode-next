import { ArrowFunction, FunctionDeclaration, TypeGuards } from "ts-morph";
import { debug } from "../../helpers/debug";
import { NextFunctionName, NextFunctionType } from "./constants";

function buildJSDocType(base: string, paramName: string) {
  return `{import('next').${base} } ${paramName}`;
}
export function addJSDoc(
  node: ArrowFunction | FunctionDeclaration,
  foundNextFunctions: NextFunctionType
): void {
  const functionNames = Object.keys(foundNextFunctions) as NextFunctionName[];
  debug("addJSDoc")({ functionNames });
  if (functionNames && functionNames.length !== 0) {
    const params = node.getParameters();
    const param = params[0];
    const typeString = foundNextFunctions[functionNames[0]].type;
    const jsDocType = buildJSDocType(typeString, "props");
    debug("addJSDoc")({ jsDocType });

    if (
      TypeGuards.isFunctionDeclaration(node) &&
      node.getJsDocs().length === 0
    ) {
      if (!param) {
        node.addParameter({
          name: "props",
        });
      }
      node.addJsDoc({
        tags: [
          {
            tagName: "param",
            text: jsDocType,
          },
        ],
      });
    }
  }
}
