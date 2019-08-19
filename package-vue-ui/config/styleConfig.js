const postcss = require('rollup-plugin-postcss')
const autoprefixer = require('autoprefixer')
const cssnano = require('cssnano')
const clear = require('rollup-plugin-clear')
const babel = require('rollup-plugin-babel')

const basePlugins = require('./basePlugins')

const styleConfig = (moduleName, external) => ({
    input: `components/${moduleName}/index.js`,
    output: {
        file: `_trash/_${moduleName}.js`,
        format: 'es',
    },
    plugins: [
        clear({
            targets: ['_trash']
        }),
        postcss({
            extensions: ['.sass', '.scss', '.css'],
            use: [
                ['sass', {
                    javascriptEnabled: true
                }]
            ],
            extract: `es/${moduleName}/style/index.css`,
            plugins: [autoprefixer, cssnano]
        }),
        babel({
            exclude: ['node_modules/**']
        }),
        ...basePlugins
    ],
    external: id => external.some(e => id.indexOf(e) === 0)
});

module.exports = styleConfig