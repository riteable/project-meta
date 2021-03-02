const { resolve } = require('path')
const dotenv = require('dotenv')
const dotenvExpand = require('dotenv-expand')
const camelcaseKeys = require('camelcase-keys')
const sassExtract = require('sass-extract')

function camelize (input, transform = true) {
  if (!transform) {
    return input
  }

  return camelcaseKeys(input)
}

module.exports = (options = {}) => {
  const defaults = {
    package: process.cwd() + '/package.json',
    env: process.cwd() + '/.env',
    sass: false,
    camelize: true
  }
  const settings = { ...defaults, ...options }

  let pkg = {}
  let env = {}
  let sass = {}
  const output = {}

  if (settings.package) {
    pkg = require(resolve(settings.package))
    output.package = camelize(pkg, settings.camelize)
  }

  if (settings.env) {
    env = dotenv.config({ path: resolve(settings.env) })
    dotenvExpand(env)
    output.env = camelize(env.parsed, settings.camelize)
  }

  if (settings.sass) {
    sass = sassExtract.renderSync({
      file: resolve(settings.sass)
    })
    output.sass = camelize(sass.vars.global, settings.camelize)
  }

  return output
}
