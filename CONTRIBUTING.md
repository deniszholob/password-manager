# To contribute

**If you are working on an existing issue, please claim it with your comment, so there is no duplicate work.**

## What you will need before you begin:

### Dev Env Setup

See [package.json](./package.json) for all the `npm run ...` scripts or view/execute them in vscode explorer sidebar.

1. Ensure NodeJS version 12.16.3 LTS or larger is installed on your system.
2. Clone the repository.
3. Run `npm run i` in the folder that you've just cloned to ensure you have all dependencies that are needed for development.
4. Install the `@recommended` extensions if using [VSCode editor](https://code.visualstudio.com/).
5. Run `npm run start` to start the app on https://localhost:4200
6. Run `npm run start:electron` after previous step to run the web app inside electron window

### Hidden Files in VSCode

Some files are hidden in vscode file viewer by default (mostly config files, not relevant to actual development),
see the `files.exclude` option in the [settings file](.vscode/settings.json) to enable them if needed.

> To quickly enable/disable the hidden files in vscode, you can use the recommended `adrianwilczynski.toggle-hidden` extension.

### VS Code Folder/File Icons

VSCode Material Icon Theme workspace settings regarding folder and file associations [do not work](https://github.com/PKief/vscode-material-icon-theme/issues/208) unless they are defined in the user settings file.

> Copy/Paste `material-icon-theme.folders.associations` and `material-icon-theme.files.associations` into your [user settings.json](https://code.visualstudio.com/docs/getstarted/settings#_settings-file-locations) from the definitions in [.vscode/settings.json](.vscode/settings.json).

## Steps to follow when your work is ready:

When your work is done:

1. Run `npm run build`.
2. Run `npm affected:test`
3. After a successful build and tests, make a commit and push your changes.
   If you're fixing a existing issue: be sure to link to that issue in the git commit message, like so:
   `Closes #IssueNumberThatGetsFixed`.
4. Create a new Pull Request.
5. Write a good description of the changes this pull-request will make.
6. You must provide screenshots if there is a visual change.

# Notes

This project has the following technologies

- [NX dev tools](https://nx.dev/angular)
- [Angular](https://angular.io/)
- [Electron](https://www.electronjs.org/)
- [TailwindCss](https://tailwindcss.com/)
- [Formly](https://formly.dev/)
- [NG-Select](https://ng-select.github.io/ng-select)
- [Ngx-Mask](https://jsdaddy.github.io/ngx-mask-page/mask-component)
- [Balloon Css](https://github.com/kazzkiq/balloon.css)

Read more about them here

- See the [NX Readme](./readme-nx.md)
- See the [NX Electron Readme](https://github.com/bennymeg/nx-electron)
- See the [NX Electron Angular Quirks](https://github.com/bennymeg/nx-electron/issues/18#issuecomment-616982776)
- See the [Tailwind Angular Build Quirk](https://github.com/angular/angular-cli/issues/20015)
  - `process.env.TAILWIND_MODE === 'build'`
  - `process?.argv?.some(arg => arg.includes(':build')),`

## Formatting/Code Styles

[Prettier Formatter](https://prettier.io/) is set up along with the [VSCode Prettier Extension](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode) to enforce consistent code style/formatting along with [Husky](https://www.npmjs.com/package/husky) and [Lint Staged](https://www.npmjs.com/package/lint-staged) to auto format before commits are pushed.

- Formatting styles are defined in [prettierrc](.prettierrc) and [editorconfig](.editorconfig)
- Husky will create git hooks on `npm install`
- The [pre-commit](.husky/pre-commit) hook calls the npm `pre-commit` script in [package.json](package.json)

## Dev Setup

1. Ensure [NodeJS](https://nodejs.org/) version `16.20.2` LTS is installed on your system.
   > Note: if using nvm, make sure to set your default `nvm alias default 16.20.2`
2. Install [VSCode](https://code.visualstudio.com/) v1.74 or later
3. Clone the repository using `git` cli or ui like github desktop/sourcetree/gitkraken etc...
4. Open the cloned folder using VSCode and `install recommended extensions` (make sure you have `ritwickdey.liveserver` to be able to hos the index.html)
5. Run `npm run i` in the folder that you've just cloned to ensure you have all dependencies that are needed for development.

## Running the code

- Run `npm run start` to start the web server
- Run `npm run start:electron` to start the electron (native) server

## Building

1. `npm run build:web` - Build the web app
2. `npm run build:electron` - Build the electron app using the web app
3. `npm run electron:make` - Makes an executable based on whatever operating system is running (eg. on windows a .exe)
