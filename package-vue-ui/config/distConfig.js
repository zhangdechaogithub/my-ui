const postcss = require('rollup-plugin-postcss')
const autoprefixer = require('autoprefixer')
const cssnano = require('cssnano')
const clear = require('rollup-plugin-clear')
const babel = require('rollup-plugin-babel')

const basePlugins = require('./basePlugins')

const NAME = 'demo'

var distConfig = (cModuleMap, external, isDev) => ({
    input: { index: 'components/index.js' },
    output: {
        dir: 'dist',
        format: 'es',
        entryFileNames: isDev ? 'index.js' : `${NAME}.js`,
        exports: 'named'
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
            inject: isDev,
            extract: isDev? `../test/public/index.css`:`dist/${NAME}.min.css`,
            plugins: [autoprefixer, cssnano]
        }),
        babel({
            exclude: 'node_modules/**'
        }),
        ...basePlugins
    ],
    experimentalCodeSplitting: true,
    external: id => external.some(e => id.indexOf(e) === 0),
    ...(isDev ? {
        watch: {
            include: 'components/**',
            clearScreen: true
        }
    } : {})
})

module.exports = distConfig