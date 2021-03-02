# project-meta

Extract project metadata from various files, such as `package.json`, `.env`, and Sass files.

## Why

To generate a web app manifest file you need data such as the following:

```
{
    "name": "My App",
    "description": "A short description of the project.",
    "background_color": "#ffffff",
    "theme_color": "#000000"
}
```

Generally, you would already have this data set in different files. The `name` might be set in a `.env` file; the `description` in `package.json`; and the colors in a Sass variables file. This module extracts the data from all these files, and makes them available to use wherever you need it.

## Install

Install the package:

```
$ npm i @riteable/project-meta
```

## Example usage

The following shows a use case involving `webpack` and the `webpack-pwa-manifest` plugin:

```javascript
// webpack.config.js
const projectMeta = require('@riteable/project-meta')
const WebpackPwaManifest = require('webpack-pwa-manifest')

const meta = projectMeta({ sass: './src/css/_variables.scss' })

module.exports = {
  // ...
  plugins: [
    new WebpackPwaManifest({
      filename: 'web-manifest.json',
      name: meta.env.appName,
      short_name: meta.env.appName,
      description: meta.package.description,
      background_color: meta.sass.$bodyColor.value.hex
    })
  ]
  // ...
}

```

## Options

`projectMeta(options = {})` accepts the following options:

- `package`: Path to the `package.json` file. Default: `process.cwd() + '/package.json'`. 
- `env`: Path to the `.env` file. Default: `process.cwd() + '/.env'`.
- `sass`: Path to the Sass variables file. Default: `false`.
- `camelize`: Set to false to keep text case as is. Default: `true`.

## Output

The following output is an example:

```javascript
{
    package: {
        name: 'my-app',
        description: 'A short description of this app.'
    },
    env: {
        appName: 'My App'
    },
    sass: {
        bodyColor: { r: 0, g: 0, b: 0, a: 1, hex: '#000000' }
    }
}
```

**NOTICE:** The module transforms the variables to camel-case by default. So, environment variables like `APP_NAME` will be turned into `appName`, and Sass variables such as `$body-color` will become `bodyColor`.
