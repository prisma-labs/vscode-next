import {
  ArrowFunction,
  FunctionDeclaration,
  SourceFile,
  TypeGuards,
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

    if (TypeGuards.isFunctionDeclaration(declaration)) {
      debug("findNodes")("isFunctionDeclaration");
      addTypes(declaration, foundNextFunctions);
    } else if (TypeGuards.isExportAssignment(declaration)) {
      debug("findNodes")("isExportAssignment");
      const expr = declaration.getExpression();

      if (TypeGuards.isArrowFunction(expr)) {
        debug("findNodes")("isArrowFunction");
        addTypes(expr, foundNextFunctions);
      } else if (TypeGuards.isIdentifier(expr)) {
        debug("findNodes")("isIdentifier");
        const node = expr
          .findReferences()[0]
          ?.getDefinition()
          .getDeclarationNode();
        const child = node?.getLastChild();

        if (
          TypeGuards.isFunctionDeclaration(node) ||
          TypeGuards.isArrowFunction(node)
        ) {
          debug("findNodes")("isFunctionDeclaration | isArrowFunction");
          addTypes(node, foundNextFunctions);
        } else if (
          TypeGuards.isArrowFunction(child) ||
          TypeGuards.isFunctionDeclaration(child)
        ) {
          debug("findNodes")("child isFunctionDeclaration | isArrowFunction");
          addTypes(child, foundNextFunctions);
        }
      }
    }
  }
}
