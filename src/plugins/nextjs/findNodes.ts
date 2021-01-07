import {
  ArrowFunction,
  FunctionDeclaration,
  SourceFile,
  Node,
} from "ts-morph";
import { debug } from "../../helpers/debug";
import { NextFunctionType } from "./constants";

/**
 * This finds the relevant ast nodes to add the types to
 * @param sourceFile
 * @param foundNextFunctions
 * @param callback
 */
export function findNodes(
  sourceFile: SourceFile,
  foundNextFunctions: NextFunctionType,
  addTypes: (
    node: ArrowFunction | FunctionDeclaration,
    foundNextFunctions: NextFunctionType
  ) => void
): void {
  const defaultExportSymbol = sourceFile.getDefaultExportSymbol();
  debug("findNodes")(`default export found: ${Boolean(defaultExportSymbol)}`);
  if (defaultExportSymbol) {
    // you will need to handle more scenarios than what's shown here
    const declaration = defaultExportSymbol.getDeclarations()[0];
    if (!declaration) return;

    if (Node.isFunctionDeclaration(declaration)) {
      debug("findNodes")("isFunctionDeclaration");
      addTypes(declaration, foundNextFunctions);
    } else if (Node.isExportAssignment(declaration)) {
      debug("findNodes")("isExportAssignment");
      const expr = declaration.getExpression();

      if (Node.isArrowFunction(expr)) {
        debug("findNodes")("isArrowFunction");
        addTypes(expr, foundNextFunctions);
      } else if (Node.isIdentifier(expr)) {
        debug("findNodes")("isIdentifier");
        const node = expr
          .findReferences()[0]
          ?.getDefinition()
          .getDeclarationNode();
        const child = node?.getLastChild();

        if (
          Node.isFunctionDeclaration(node) ||
          Node.isArrowFunction(node)
        ) {
          debug("findNodes")("isFunctionDeclaration | isArrowFunction");
          addTypes(node, foundNextFunctions);
        } else if (
          Node.isArrowFunction(child) ||
          Node.isFunctionDeclaration(child)
        ) {
          debug("findNodes")("child isFunctionDeclaration | isArrowFunction");
          addTypes(child, foundNextFunctions);
        }
      }
    }
  }
}
