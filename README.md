# Prisma-Nextjs
[![Visual Studio Code extension](https://vsmarketplacebadge.apphb.com/version/willluke.nextjs.svg)](https://marketplace.visualstudio.com/items?itemName=willluke.nextjs)

## Features

Automatically adds types to your **Next.js** page components if you use `getStaticSideProps` or `getServerSideProps`.
The returned types can not be automatically inferred and passed to the page. 

This extension also enables type safety in js code by leveraging JsDocs.

<br/>

<p align="center">
  <img src="https://github.com/prisma-labs/vscode-next/blob/main/images/NextJS-AutoTypes.gif?raw=true" title="Demo">
</p>

## Requirements

A Project with next as a dependency in your `package.json`

## Extension Settings

| Name                             | Description                                 | Default |
| -------------------------------- | ------------------------------------------- | ------- |
| `WillLuke.nextjs.root`           | Option to set the path to a nextjs project  |         |
| `WillLuke.nextjs.hasPrompted`    | Hides Autotypes Prompt if it has been shown | `false` |
| `WillLuke.nextjs.addTypesOnSave` | Automatically add NextJS page types on save | `false` |
| `WillLuke.debug`                 | Debug the Extension                         | `false` |

# Trying it out 
- [Install the extension](https://marketplace.visualstudio.com/items?itemName=WillLuke.nextjs)
- Install the example
```
git clone https://github.com/williamluke4/vscode-next-types-example
yarn
```
- Open VSCode 
- Accept Autotypes Prompt
<p align="center">
  <img src="https://github.com/prisma-labs/vscode-next/blob/main/images/prompt.png?raw=true" title="Prompt">
</p>

- Navigate to `pages/songs/[id].tsx` or `pages/ssr-songs/[id].jsx`
- Hit Save `ctrl-s` or `ctrl-p` then search types
## Known Issues

- Workspaces not Supported

## Development

### Installing

```bash
git clone https://github.com/prisma-labs/vscode-next.git
cd vscode-next
yarn
```

### Debugging/Developing

Use VSCode built in debugger and select Run Extension

<p align="center">
  <img src="https://github.com/prisma-labs/vscode-next/blob/main/images/run-extension.png?raw=true" title="Run Extension">
</p>

### Packaging

```bash
yarn pkg
```
