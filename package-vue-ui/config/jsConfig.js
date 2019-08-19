const postcss = require('rollup-plugin-postcss')
const clear = require('rollup-plugin-clear')
const babel = require('rollup-plugin-babel')

const basePlugins = require('./basePlugins')
//
var jsConfig = (cModuleMap, external, isDev) => ({
    input: { ...cModuleMap },
    output: {
        dir: 'es',
        format: 'es',
        sourcemap: true,
        entryFileNames: '[name]/index.js',
        exports: 'named'
    },
    plugins: [
        clear({
            targets: ['es', '_trash', 'dist']
        }),
        postcss({
            extensions: ['.sass', '.scss', '.css'],
            use: [
                ['sass', {
                    javascriptEnabled: true
                }]
            ],
            inject: isDev,
            extract: false
        }),

        babel({
            exclude: ['node_modules/**']
        }),
        ...basePlugins
    ],
    experimentalCodeSplitting: true,
    external: id => external.some(e => id.indexOf(e) === 0)

})

module.exports = jsConfig