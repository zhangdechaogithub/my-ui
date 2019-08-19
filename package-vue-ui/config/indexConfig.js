const postcss = require('rollup-plugin-postcss')
const autoprefixer = require('autoprefixer')
const cssnano = require('cssnano')
const clear = require('rollup-plugin-clear')
const babel = require('rollup-plugin-babel')

const basePlugins = require('./basePlugins')

var indexConfig = (cModuleMap, external) => ({
    input: { index: 'components/index.js' },
    output: {
        dir: 'es',
        format: 'es',
        entryFileNames: 'index.js',
        exports: 'named',
        minify: true
    },
    plugins: [
        clear({
            targets: ['dist', 'es', '_trash']
        }),
        postcss({
            extensions: ['.sass', '.scss', '.css'],
            use: [
                ['sass', {
                    javascriptEnabled: true
                }]
            ],
            inject: false,
            extract: 'es/index.min.css',
            plugins: [autoprefixer, cssnano]
        }),
        babel({
            exclude: 'node_modules/**',
            "presets": ["minify"]
        }),
        ...basePlugins
    ],
    experimentalCodeSplitting: true,
    external: id => external.some(e => id.indexOf(e) === 0)

})

module.exports = indexConfig