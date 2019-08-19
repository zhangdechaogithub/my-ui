const fs = require('fs')
const path = require('path')
const componentDir = 'components'
const fontDirName = 'font'
const cModuleNames = fs.readdirSync(path.resolve(componentDir))

const cModuleMap = cModuleNames.filter((v, i) => {
    var reg = new RegExp('\.js$')
    return !reg.test(v)
}).reduce((prev, name) => {
    if (name !== 'vc') {
        prev[name] = `${componentDir}/${name}/index.js`
    }
    return prev;
}, {});

module.exports = cModuleMap