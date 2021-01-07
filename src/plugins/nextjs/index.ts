import * as path from "path";
import {
  commands,
  TextDocument,
  TextDocumentSaveReason,
  TextDocumentWillSaveEvent,
  window,
  workspace,
} from "vscode";
import { debug } from "../../helpers/debug";
import settings from "../../helpers/settings";
import { packageJsonIncludes } from "../../helpers/workspace";
import { PrismaVSCodePlugin } from "../types";
import { NextTypes } from "./nextTypes";
const nextTypes = new NextTypes({ save: true });
const supportedLanguageIds = [
  "typescriptreact",
  "javascriptreact",
  "typescript",
  "javascript",
];
// This is used to get around other plugins that modify the document in onWillSave
let shouldUpdate = false;

const plugin: PrismaVSCodePlugin = {
  name: "nextjs",
  enabled: async () => {
    // TODO Add Workspace Support currently only checks the workspace root for deps
    const hasNext = await packageJsonIncludes("next", ["dependencies"]);

    debug("nextjs:enable")({ hasNext });
    return hasNext;
  },
  activate: async (context) => {
    // TODO Someone please help with a better message
    if (!settings.nextjs.hasPrompted()) {
      const res = await window.showInformationMessage(
        "Would you like to enable NextJS autotypes",
        "Yes",
        "No"
      );
      if (res === "Yes") {
        await settings.nextjs.shouldAutoFormat(true);
      }
      await settings.nextjs.hasPrompted(true);
    }
    if (settings.nextjs.shouldAutoFormat()) {
      debug("nextjs:onSave")("adding on save hook");
      workspace.onWillSaveTextDocument((e: TextDocumentWillSaveEvent) => {
        if (
          e.reason === TextDocumentSaveReason.Manual &&
          supportedLanguageIds.includes(e.document.languageId) &&
          settings.nextjs.shouldAutoFormat()
        ) {
          shouldUpdate = true;
        }
      });
      const onSaveDisposable = workspace.onDidSaveTextDocument(
        async (document: TextDocument) => {
          if (shouldUpdate) {
            await formatDocument(document);
          }
          shouldUpdate = false;
        }
      );
      context.subscriptions.push(onSaveDisposable);
    }
    debug("nextjs:command")("registering addTypes");
    context.subscriptions.push(
      commands.registerCommand("WillLuke.nextjs.addTypes", async () => {
        await formatDocument();
      })
    );
  },
};
async function formatDocument(document?: TextDocument) {
  const filename = document
    ? document.fileName
    : window.activeTextEditor?.document.fileName;
  if (
    filename &&
    filename.includes("pages") &&
    !filename.includes(path.join("pages", "api"))
  ) {
    try {
      debug("nextjs")(`adding types to ${filename}`);
      await nextTypes.run(filename);
    } catch (e) {
      console.error(e);
    }
  } else {
    console.warn("This can only be used in a NextJS pages Directory");
  }
}
export default plugin;
