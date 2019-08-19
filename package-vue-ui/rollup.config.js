const pkg = require('./package.json')
const jsConfig = require('./config/jsConfig')
const styleConfig = require('./config/styleConfig')
const distConfig = require('./config/distConfig')
const indexConfig = require('./config/indexConfig')
const cModuleMap = require('./config/obtainComponentsName')

const external = pkg.dependencies ? Object.keys(pkg.dependencies) : []
const isDev = process.env.NODE_ENV === 'dev'

const rollupConfig = isDev ?
    distConfig(cModuleMap, external, isDev) : [
        indexConfig(cModuleMap, external),
        distConfig(cModuleMap, external, isDev),
        jsConfig(cModuleMap, external, isDev)
    ].concat(
        Object.keys(cModuleMap).map(moduleName => styleConfig(moduleName, external))
    )

module.exports = rollupConfig;