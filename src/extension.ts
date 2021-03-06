import { ExtensionContext } from "vscode";
import plugins from "./plugins";
import { debug } from './helpers/debug'
export function activate(context: ExtensionContext): void {

  plugins.map(async (plugin) => {
    const enabled = await plugin.enabled();
    if (enabled) {
      debug('activate')(`Activating ${plugin.name}`);
      if (plugin.activate) {
        await plugin.activate(context);
      }
    } else {
      debug('activate')(`${plugin.name} is Disabled`);
    }
  });
}

export function deactivate(): void {
  plugins.forEach((plugin) => {
    if (plugin.deactivate) {
      debug('deactivate')(plugin.name);
      void plugin.deactivate();
    }
  });
}
