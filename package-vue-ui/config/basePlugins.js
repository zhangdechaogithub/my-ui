const resolve = require('rollup-plugin-node-resolve')

module.exports = [resolve({
    customResolveOptions: {
        moduleDirectory: 'node_modules'
    }
})]